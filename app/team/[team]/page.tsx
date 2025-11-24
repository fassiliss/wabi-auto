import Footer from "../../components/Footer";

const members: Record<
    string,
    {
        name: string;
        role: string;
        image: string;
        bio: string;
        experience: string;
        specialties: string[];
    }
> = {
    "lead-technician": {
        name: "Abel Mekonnen",
        role: "Lead Technician",
        image: "/images/team/team-1.jpg",
        bio:
            "Abel leads the Wabi Auto workshop with a focus on quality, honesty, and attention to detail. He treats every vehicle as if it were his own.",
        experience:
            "Over 12 years of experience in diagnostics, engine repair, and drivability issues across domestic and import vehicles.",
        specialties: [
            "Advanced engine diagnostics",
            "Drivetrain and transmission work",
            "Performance troubleshooting",
            "Customer-focused repair planning",
        ],
    },
    "service-advisor": {
        name: "Sarah Johnson",
        role: "Service Advisor",
        image: "/images/team/team-2.jpg",
        bio:
            "Sarah is the bridge between customers and technicians, making sure you understand every step of the repair process.",
        experience:
            "8+ years in automotive service advising, scheduling, and customer communication.",
        specialties: [
            "Service planning & estimates",
            "Customer communication",
            "Repair status updates",
            "Warranty & maintenance schedules",
        ],
    },
    "diagnostic-specialist": {
        name: "Michael Lee",
        role: "Diagnostic Specialist",
        image: "/images/team/team-3.jpg",
        bio:
            "Michael loves solving tough problems that other shops couldn’t fix, using advanced diagnostic tools and data analysis.",
        experience:
            "10 years specializing in electrical systems, check-engine lights, and hard-to-find issues.",
        specialties: [
            "Electrical diagnostics",
            "Network & module communication",
            "Driveability concerns",
            "Complex fault code analysis",
        ],
    },
    "detail-expert": {
        name: "Emily Rodriguez",
        role: "Detailing Expert",
        image: "/images/team/team-4.jpg",
        bio:
            "Emily focuses on the finishing touches that make your vehicle look and feel brand new after every visit.",
        experience:
            "7+ years in professional detailing, paint correction, and ceramic coating application.",
        specialties: [
            "Interior & exterior detailing",
            "Paint correction",
            "Ceramic coatings",
            "Customer delivery preparation",
        ],
    },
};

export default function TeamMemberPage({
                                           params,
                                       }: {
    params: { slug: string };
}) {
    const member = members[params.slug];

    if (!member) {
        return (
            <main style={{ padding: "4rem", textAlign: "center" }}>
                <h1>Team Member Not Found</h1>
                <p>
                    The team member you are looking for does not exist. Go back to{" "}
                    <a href="/team" style={{ textDecoration: "underline" }}>
                        Team
                    </a>
                    .
                </p>
            </main>
        );
    }

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
                        <h1 className="te-breadcrumb-title">Team Details</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/team">Team</a>
                            </li>
                            <li className="active">{member.name}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Team member content */}
            <section className="te-py-120">
                <div className="container">
                    <div className="row gy-5 align-items-center">
                        <div className="col-lg-4">
                            <div className="te-team-details-image">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="img-fluid rounded"
                                />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="te-team-details-content">
                                <h2 className="mb-1">{member.name}</h2>
                                <p className="text-muted mb-3">{member.role}</p>

                                <p className="mb-3">{member.bio}</p>

                                <h4 className="mb-2">Experience</h4>
                                <p className="mb-3">{member.experience}</p>

                                <h4 className="mb-2">Specialties</h4>
                                <ul className="te-project-bullet-list">
                                    {member.specialties.map((s, i) => (
                                        <li key={i}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
