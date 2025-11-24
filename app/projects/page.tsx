import Footer from "../components/Footer";

const projects = [
    {
        slug: "premium-car-polishing",
        title: "Premium Car Polishing",
        category: "Car Care",
        image: "/images/project/carpolishing.png",
    },
    {
        slug: "full-engine-rebuild",
        title: "Full Engine Rebuild",
        category: "Engine Service",
        image: "/images/project/enginerebuild.png",
    },
    {
        slug: "suspension-upgrade",
        title: "Suspension Tuning Excellence",
        category: "Suspension",
        image: "/images/project/suspensiontuning.png",
    },
    {
        slug: "automatic-transmission-repair",
        title: "Automatic Transmission Repair",
        category: "Transmission",
        image: "/images/project/automatictransmission.png",
    },
];

export default function ProjectsPage() {
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
                        <h1 className="te-breadcrumb-title">Our Projects</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li className="active">Projects</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <section className="te-py-120">
                <div className="container">
                    <div className="te-section-title-wrapper text-center mb-5">
                        <span className="short-title">our portfolio</span>
                        <h2 className="title">
                            Your Road to Reliable
                            <br />
                            Repairs Cars
                        </h2>
                    </div>

                    <div className="row gy-4">
                        {projects.map((project) => (
                            <div className="col-md-6 col-lg-3" key={project.slug}>
                                <div className="te-portfolio-card">
                                    <div className="image">
                                        <a href={`/projects/${project.slug}`}>
                                            <img src={project.image} alt={project.title} />
                                        </a>
                                        <span className="te-portfolio-category">
                      {project.category}
                    </span>
                                    </div>
                                    <div className="content">
                                        <h3 className="title">
                                            <a href={`/projects/${project.slug}`}>
                                                {project.title}
                                            </a>
                                        </h3>
                                        <a
                                            href={`/projects/${project.slug}`}
                                            className="te-text-link"
                                        >
                                            VIEW DETAILS
                                        </a>
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
