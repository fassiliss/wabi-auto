'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Customer = {
  bookings: Array<{
    appointmentDate?: string;
    appointmentTime?: string;
    id: string;
    service: string;
    status: string;
    vehicle: string;
  }>;
  email: string;
  id: string;
  lastActivity: string;
  lastService: string;
  name: string;
  phone: string;
  requests: Array<{
    createdAt?: string;
    id: string;
    message?: string;
    service: string;
    status: string;
  }>;
  source: 'booking' | 'service-request';
  status: string;
  totalBookings: number;
  totalRequests: number;
};

const sourceLabels = {
  booking: 'Booking',
  'service-request': 'Request',
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      router.push('/admin');
      return () => observer.disconnect();
    }

    const fetchCustomers = async () => {
      try {
        const res = await fetch('/api/customers');
        if (res.status === 401) {
          localStorage.removeItem('adminAuth');
          router.push('/admin');
          return;
        }
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data);
          setSelectedCustomerId(data.data[0]?.id || '');
        } else {
          setError(data.error || 'Failed to load customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        setError('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();

    return () => observer.disconnect();
  }, [router]);

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone.includes(searchTerm) ||
      customer.lastService.toLowerCase().includes(search);

    const matchesSource = sourceFilter === 'all' || customer.source === sourceFilter;

    return matchesSearch && matchesSource;
  });

  const customersWithBookings = customers.filter((customer) => customer.totalBookings > 0).length;
  const customersWithRequests = customers.filter((customer) => customer.totalRequests > 0).length;
  const selectedCustomer =
    customers.find((customer) => customer.id === selectedCustomerId) || filteredCustomers[0];
  const theme = getTheme(isDark);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading customers...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.pageBg, padding: '160px 20px 40px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          background: theme.panelBg,
          border: theme.panelBorder,
          padding: '24px 30px',
          borderRadius: '12px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div>
            <h1 style={{ margin: 0, color: theme.headingColor, fontWeight: 900 }}>Customer Management</h1>
            <p style={{ margin: '6px 0 0', color: theme.mutedColor }}>
              View customers from bookings and service requests in one place.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link href="/admin/dashboard" style={buttonStyle('#6b7280')}>
              Dashboard
            </Link>
            <Link href="/admin/bookings" style={buttonStyle('#2563eb')}>
              Bookings
            </Link>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <StatCard label="Total Customers" value={customers.length} color={theme.headingColor} theme={theme} />
          <StatCard label="With Bookings" value={customersWithBookings} color="#2563eb" theme={theme} />
          <StatCard label="With Requests" value={customersWithRequests} color="#f59e0b" theme={theme} />
          <StatCard label="Visible Now" value={filteredCustomers.length} color="#10b981" theme={theme} />
        </div>

        <div style={{
          background: theme.panelBg,
          border: theme.panelBorder,
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name, email, phone, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '260px',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                background: theme.inputBg,
                color: theme.textColor,
              }}
            />
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '15px',
                cursor: 'pointer',
                background: theme.inputBg,
                color: theme.textColor,
              }}
            >
              <option value="all">All Customers</option>
              <option value="booking">Booking Customers</option>
              <option value="service-request">Request Customers</option>
            </select>
          </div>
        </div>

        <div style={{
          background: theme.panelBg,
          border: theme.panelBorder,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          {error ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: theme.mutedColor }}>
              <h3 style={{ margin: '0 0 10px', color: theme.headingColor }}>Customers could not load</h3>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: theme.mutedColor }}>
              <p>No customers found</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: theme.tableHeaderBg, borderBottom: `2px solid ${theme.rowBorder}` }}>
                    <TableHead theme={theme}>Customer</TableHead>
                    <TableHead theme={theme}>Contact</TableHead>
                    <TableHead theme={theme}>Last Service</TableHead>
                    <TableHead theme={theme}>Activity</TableHead>
                    <TableHead theme={theme}>Status</TableHead>
                    <TableHead theme={theme}>Actions</TableHead>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={`${customer.email}-${customer.phone}`} style={{ borderBottom: `1px solid ${theme.rowBorder}` }}>
                      <td style={cellStyle(theme)}>
                        <div style={{ color: theme.headingColor, fontWeight: 800 }}>{customer.name}</div>
                        <div style={{ color: theme.mutedColor, fontSize: '13px' }}>
                          {sourceLabels[customer.source]} customer
                        </div>
                      </td>
                      <td style={cellStyle(theme)}>
                        <div style={{ color: theme.textColor }}>{customer.email}</div>
                        <div style={{ color: theme.mutedColor, fontSize: '13px' }}>{customer.phone}</div>
                      </td>
                      <td style={cellStyle(theme)}>
                        <div style={{ color: theme.headingColor, fontWeight: 600 }}>{customer.lastService}</div>
                        <div style={{ color: theme.mutedColor, fontSize: '13px' }}>
                          {customer.totalBookings} booking{customer.totalBookings === 1 ? '' : 's'} · {customer.totalRequests} request{customer.totalRequests === 1 ? '' : 's'}
                        </div>
                      </td>
                      <td style={cellStyle(theme)}>
                        {new Date(customer.lastActivity).toLocaleDateString()}
                      </td>
                      <td style={cellStyle(theme)}>
                        <span style={{
                          display: 'inline-flex',
                          padding: '6px 10px',
                          borderRadius: '999px',
                          background: '#eef2ff',
                          color: '#3730a3',
                          fontSize: '12px',
                          fontWeight: 800,
                          textTransform: 'capitalize',
                        }}>
                          {customer.status}
                        </span>
                      </td>
                      <td style={cellStyle(theme)}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            onClick={() => setSelectedCustomerId(customer.id)}
                            style={{
                              ...smallActionStyle('#111827'),
                              border: 'none',
                              cursor: 'pointer',
                            }}
                          >
                            Details
                          </button>
                          <a href={`mailto:${customer.email}`} style={smallActionStyle('#2563eb')}>
                            Email
                          </a>
                          <a href={`tel:${customer.phone}`} style={smallActionStyle('#10b981')}>
                            Call
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedCustomer && !error && (
          <div style={{
            background: theme.panelBg,
            border: theme.panelBorder,
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
              <div>
                <h2 style={{ margin: 0, color: theme.headingColor, fontWeight: 900 }}>{selectedCustomer.name}</h2>
                <p style={{ margin: '6px 0 0', color: theme.mutedColor }}>
                  {selectedCustomer.email} · {selectedCustomer.phone}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href={`mailto:${selectedCustomer.email}`} style={smallActionStyle('#2563eb')}>Email</a>
                <a href={`tel:${selectedCustomer.phone}`} style={smallActionStyle('#10b981')}>Call</a>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
              <HistoryList
                emptyText="No bookings yet"
                items={selectedCustomer.bookings.map((booking) => ({
                  href: `/admin/bookings/edit/${booking.id}`,
                  label: booking.service,
                  meta: `${booking.vehicle || 'Vehicle not listed'} · ${formatDate(booking.appointmentDate)} ${booking.appointmentTime || ''}`,
                  status: booking.status,
                }))}
                title="Booking History"
                theme={theme}
              />
              <HistoryList
                emptyText="No service requests yet"
                items={selectedCustomer.requests.map((request) => ({
                  label: request.service,
                  meta: `${formatDate(request.createdAt)}${request.message ? ` · ${request.message}` : ''}`,
                  status: request.status,
                }))}
                title="Request History"
                theme={theme}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDate(value?: string) {
  if (!value) {
    return 'No date';
  }

  return new Date(value).toLocaleDateString();
}

function HistoryList({
  emptyText,
  items,
  theme,
  title,
}: {
  emptyText: string;
  items: Array<{ href?: string; label: string; meta: string; status: string }>;
  theme: AdminTheme;
  title: string;
}) {
  return (
    <div style={{ border: theme.panelBorder, borderRadius: '10px', overflow: 'hidden' }}>
      <h3 style={{ margin: 0, padding: '14px 16px', background: theme.tableHeaderBg, color: theme.headingColor, fontSize: '16px' }}>
        {title}
      </h3>
      {items.length === 0 ? (
        <p style={{ margin: 0, padding: '16px', color: theme.mutedColor }}>{emptyText}</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={`${item.label}-${item.meta}`} style={{ padding: '14px 16px', borderTop: `1px solid ${theme.rowBorder}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                <div>
                  <div style={{ color: theme.headingColor, fontWeight: 800 }}>
                    {item.href ? <Link href={item.href} style={{ color: theme.headingColor, textDecoration: 'none' }}>{item.label}</Link> : item.label}
                  </div>
                  <div style={{ color: theme.mutedColor, fontSize: '13px', marginTop: '4px' }}>{item.meta}</div>
                </div>
                <span style={{
                  background: '#eef2ff',
                  borderRadius: '999px',
                  color: '#3730a3',
                  fontSize: '12px',
                  fontWeight: 800,
                  padding: '6px 10px',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap',
                }}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color, theme }: { label: string; value: number; color: string; theme: AdminTheme }) {
  return (
    <div style={{ background: theme.panelBg, border: theme.panelBorder, padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <p style={{ margin: 0, color: theme.mutedColor, fontSize: '14px' }}>{label}</p>
      <h2 style={{ margin: '5px 0 0', color }}>{value}</h2>
    </div>
  );
}

function TableHead({ children, theme }: { children: React.ReactNode; theme: AdminTheme }) {
  return (
    <th style={{ padding: '15px', textAlign: 'left', fontWeight: 800, color: theme.textColor }}>
      {children}
    </th>
  );
}

type AdminTheme = ReturnType<typeof getTheme>;

function getTheme(isDark: boolean) {
  return {
    headingColor: isDark ? '#f9fafb' : '#111827',
    inputBg: isDark ? '#0b1220' : '#ffffff',
    mutedColor: isDark ? '#9ca3af' : '#6b7280',
    pageBg: isDark ? '#0a0f1a' : '#f3f4f6',
    panelBg: isDark ? '#111827' : '#ffffff',
    panelBorder: isDark ? '1px solid #243041' : '1px solid #e5e7eb',
    rowBorder: isDark ? '#253244' : '#e5e7eb',
    tableHeaderBg: isDark ? '#172033' : '#f9fafb',
    textColor: isDark ? '#e5e7eb' : '#374151',
  };
}

function cellStyle(theme: AdminTheme) {
  return {
    padding: '15px',
    color: theme.mutedColor,
    fontSize: '14px',
    verticalAlign: 'top',
  } as const;
}

function buttonStyle(background: string) {
  return {
    padding: '10px 18px',
    background,
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 800,
  } as const;
}

function smallActionStyle(background: string) {
  return {
    padding: '7px 12px',
    background,
    color: 'white',
    borderRadius: '7px',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 800,
  } as const;
}
