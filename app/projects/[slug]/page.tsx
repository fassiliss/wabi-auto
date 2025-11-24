import Footer from "../../components/Footer";

// Project data
const projects: Record<
    string,
    {
        title: string;
        image: string;
        heroTitle: string;
        intro: string;
        reliability: string;
        bullets: string[];
        body: string;
        info: {
            projectName: string;
            author: string;
            tags: string;
            value: string;
            startDate: string;
            endDate: string;
            rating: number;
        };
    }
> = {
    "premium-car-polishing": {
        title: "Premium Car Polishing",
        image: "/images/project/project-1.jpg",
        heroTitle: "Where Quality Meets The Road",
        intro:
            "This premium detailing project focused on restoring the vehicle’s shine, removing swirl marks, and protecting the paint from future damage. Using multi-stage polishing, we brought back a deep, mirror-like gloss.",
        reliability:
            "Engineered for reliability, this project ensured long-lasting paint protection while keeping the car looking showroom ready. Each step followed a precise process for surface preparation, correction, and protection.",
        bullets: [
            "Precision Automotive Services",
            "Drive worry-free thanks to our detailing mastery",
            "Restoring your car’s shine, one panel at a time",
            "Driving excellence, one project at a time",
        ],
        body:
            "Our detailing process starts with a thorough wash and decontamination to remove embedded dirt and iron particles. We then perform multi-stage machine polishing to correct defects such as swirl marks, light scratches, and oxidation. Finally, we apply a high-quality sealant or ceramic coating to lock in the finish and make future washes easier. The result is a deep, reflective shine and long-term protection for the vehicle’s paint.",
        info: {
            projectName: "Auto Detailing",
            author: "Wabi Auto Team",
            tags: "Detailing, Paint Care",
            value: "$1,200 USD",
            startDate: "10 March, 2025",
            endDate: "15 March, 2025",
            rating: 5,
        },
    },

    "full-engine-rebuild": {
        title: "Full Engine Rebuild",
        image: "/images/project/project-2.jpg",
        heroTitle: "Where Quality Meets The Road",
        intro:
            "This complete engine rebuild restored performance, efficiency, and reliability for a high-mileage vehicle. Every critical component was inspected, machined, or replaced to meet factory or better specifications.",
        reliability:
            "Engineered for reliability, this rebuild ensures thousands of trouble-free miles. From precise torque specs to high-quality replacement parts, every step was designed to extend engine life.",
        bullets: [
            "Complete engine teardown & inspection",
            "Replacing worn internal components",
            "Restoring power, efficiency, and smoothness",
            "Driving excellence, one engine at a time",
        ],
        body:
            "After a full diagnostic and compression test, we removed and disassembled the engine. Components such as bearings, piston rings, gaskets, and seals were replaced, while the block and head were machined to spec. Once reassembled, the engine was carefully broken in and road-tested to verify oil pressure, temperatures, and power delivery. The customer left with a smoother, stronger, and far more reliable engine.",
        info: {
            projectName: "Engine Rebuild",
            author: "Wabi Auto Engine Team",
            tags: "Engine, Repair",
            value: "$5,800 USD",
            startDate: "23 December, 2024",
            endDate: "25 January, 2025",
            rating: 5,
        },
    },

    "suspension-upgrade": {
        title: "Suspension Tuning Excellence",
        image: "/images/project/project-3.jpg",
        heroTitle: "Where Quality Meets The Road",
        intro:
            "For this suspension upgrade, the goal was a more confident and comfortable drive without sacrificing stability. We selected and tuned components to match the owner’s driving style.",
        reliability:
            "Engineered for reliability as well as performance, the upgraded suspension provides better control in corners, reduced body roll, and a smoother ride over rough surfaces.",
        bullets: [
            "Custom suspension component selection",
            "Ride height and damping adjustments",
            "Improved handling and road feedback",
            "Driving confidence, one corner at a time",
        ],
        body:
            "We began with a full inspection of the existing suspension, then replaced worn parts with performance-oriented shocks, springs, and bushings. After installation, we fine-tuned alignment settings to balance responsiveness and comfort. A final road test ensured the vehicle felt stable at speed, predictable in corners, and compliant over bumps.",
        info: {
            projectName: "Suspension Upgrade",
            author: "Wabi Auto Chassis Team",
            tags: "Suspension, Handling",
            value: "$2,400 USD",
            startDate: "05 February, 2025",
            endDate: "15 February, 2025",
            rating: 4,
        },
    },

    "automatic-transmission-repair": {
        title: "Automatic Transmission Repair",
        image: "/images/project/project-4.jpg",
        heroTitle: "Where Quality Meets The Road",
        intro:
            "This automatic transmission repair addressed slipping, harsh shifts, and delayed engagement. Through diagnostics and component replacement, shifting performance was fully restored.",
        reliability:
            "Engineered for reliability, the repaired transmission delivers smooth gear changes, reduced heat, and extended service life under daily driving conditions.",
        bullets: [
            "Precision diagnostic scanning",
            "Repairing internal transmission components",
            "Fresh fluid and filtration service",
            "Restoring smooth and confident shifting",
        ],
        body:
            "We started with a complete scan and road test to identify the exact conditions causing the faulty shifts. After dropping the transmission pan, we inspected for debris and wear, then replaced worn components, seals, and the filter. New fluid was added to spec and the vehicle was road-tested through various load conditions to confirm smooth and consistent operation.",
        info: {
            projectName: "Transmission Repair",
            author: "Wabi Auto Drivetrain Team",
            tags: "Transmission, Repair",
            value: "$3,600 USD",
            startDate: "12 April, 2025",
            endDate: "30 April, 2025",
            rating: 5,
        },
    },
};

export default function ProjectDetailsPage({
                                               params,
                                           }: {
    params: { slug: string };
}) {
    const project = projects[params.slug];

    if (!project) {
        return (
            <main style={{ padding: "4rem", textAlign: "center" }}>
                <h1>Project Not Found</h1>
                <p>
                    The project you are looking for does not exist. Please go back to{" "}
                    <a href="/projects" style={{ textDecoration: "underline" }}>
                        Projects
                    </a>
                    .
                </p>
            </main>
        );
    }

    const { info } = project;

    return (
        <>
            {/* Breadcrumb / Page Header */}
            <div
                className="te-breadcrumb-area"
                style={{
                    backgroundImage: "url('/images/section-bg/page-header.jpg')",
                }}
            >
                <div className="container">
                    <div className="te-breadcrumb-content text-center">
                        <h1 className="te-breadcrumb-title">Project Details</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/projects">Projects</a>
                            </li>
                            <li className="active">{project.title}</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Project Details Section */}
            <section className="te-py-120">
                <div className="container">
                    <div className="row gy-5">
                        {/* Left column – main content */}
                        <div className="col-lg-8">
                            <div className="te-project-details-main">
                                {/* Big hero image */}
                                <div className="te-project-image mb-4">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="img-fluid"
                                    />
                                </div>

                                {/* Text sections */}
                                <h2 className="mb-3">{project.heroTitle}</h2>
                                <p className="mb-4">{project.intro}</p>

                                <h3 className="mb-3">Engineered for Reliability</h3>
                                <p className="mb-4">{project.reliability}</p>

                                {/* Bullet list */}
                                <ul className="te-project-bullet-list mb-4">
                                    {project.bullets.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>

                                {/* Body text */}
                                <p>{project.body}</p>
                            </div>
                        </div>

                        {/* Right column – Project Information box */}
                        <div className="col-lg-4">
                            <aside className="te-project-info-sidebar">
                                <div className="te-project-info-card">
                                    <h3 className="title">Project Information</h3>
                                    <ul>
                                        <li>
                                            <span>Project Name:</span> <b>{info.projectName}</b>
                                        </li>
                                        <li>
                                            <span>Author:</span> <b>{info.author}</b>
                                        </li>
                                        <li>
                                            <span>Tags:</span> <b>{info.tags}</b>
                                        </li>
                                        <li>
                                            <span>Value:</span> <b>{info.value}</b>
                                        </li>
                                        <li>
                                            <span>Start Date:</span> <b>{info.startDate}</b>
                                        </li>
                                        <li>
                                            <span>End Date:</span> <b>{info.endDate}</b>
                                        </li>
                                        <li>
                                            <span>Rating:</span>{" "}
                                            <b>
                                                {"★".repeat(info.rating)}{" "}
                                                <span style={{ opacity: 0.7 }}>
                          ({info.rating}.0)
                        </span>
                                            </b>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
