import Link from "next/link";
import Footer from "../components/Footer";

const teamMembers = [
    {
        slug: "lead-technician",
        name: "Abel Mekonnen",
        role: "Lead Technician",
        image: "/images/team/team-1.jpg", // adjust paths
    },
    {
        slug: "service-advisor",
        name: "Sarah Johnson",
        role: "Service Advisor",
        image: "/images/team/team-2.jpg",
    },
    {
        slug: "diagnostic-specialist",
        name: "Michael Lee",
        role: "Diagnostic Specialist",
        image: "/images/team/team-3.jpg",
    },
    {
        slug: "detail-expert",
        name: "Emily Rodriguez",
        role: "Detailing Expert",
        image: "/images/team/team-4.jpg",
    },
];

export default function TeamPage() {
    return (
        <>
            {/* Breadcrumb */}
            <div
                className="te-breadcrumb-area"
                style={{
                    backgroundImage: "url('/images/section-bg/page-header.jpg')",
                }}
            >
                <div className="container">
                    <div className="te-breadcrumb-content text-center">
                        <h1 className="te-breadcrumb-title">Our Team</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li className="active">Team</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Team Grid */}
            <section className="te-py-120">
                <div className="container">
                    <div className="te-section-title-wrapper text-center mb-5">
                        <span className="short-title">our team member</span>
                        <h2 className="title">
                            Building Confidence
                            <br />
                            in Every Repair
                        </h2>
                    </div>

                    <div className="row gy-4">
                        {teamMembers.map((member) => (
                            <div className="col-md-6 col-lg-3" key={member.slug}>
                                <div className="te-team-card">
                                    <div className="image">
                                        <Link href={`/team/${member.slug}`}>
                                            <img src={member.image} alt={member.name} />
                                        </Link>
                                    </div>
                                    <div className="content text-center">
                                        <h3 className="title">
                                            <Link href={`/team/${member.slug}`}>{member.name}</Link>
                                        </h3>
                                        <p className="sub-title">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
