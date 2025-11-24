// app/blog/page.tsx
import Link from "next/link";
import Footer from "../components/Footer";
import { blogPosts } from "./postsData";

function getDateParts(dateStr: string) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
        // fallback if date parsing fails
        return { day: "01", month: "JAN" };
    }
    const day = d.getDate().toString().padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
    return { day, month };
}

export default function BlogPage() {
    return (
        <>
            {/* Page Banner / Breadcrumb */}
            <div
                className="te-breadcrumb-area"
                style={{
                    backgroundImage: "url('/images/section-bg/page-header.jpg')",
                }}
            >
                <div className="container">
                    <div className="te-breadcrumb-content text-center">
                        <h1 className="te-breadcrumb-title">Latest Blog</h1>
                        <ul className="te-breadcrumb-list">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li className="active">Blog</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Blog List */}
            <section className="te-blog-area te-py-120">
                <div className="container">
                    <div className="row gy-5">
                        {blogPosts.map((post) => {
                            const { day, month } = getDateParts(post.date);
                            return (
                                <div className="col-md-6 col-lg-4" key={post.slug}>
                                    <article className="te-blog-card">
                                        {/* Image + date badge */}
                                        <div className="te-blog-thumb">
                                            <Link href={`/blog/${post.slug}`}>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="img-fluid w-100"
                                                />
                                            </Link>
                                            <div className="te-blog-date-badge">
                                                <span className="day">{day}</span>
                                                <span className="month">{month}</span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="te-blog-content">
                                            <div className="te-blog-meta">
                        <span>
                          <i className="fa-solid fa-user"></i> {post.author}
                        </span>
                                                <span>
                          <i className="fa-solid fa-tags"></i> {post.category}
                        </span>
                                                <span>
                          <i className="fa-regular fa-clock"></i>{" "}
                                                    {post.readTime}
                        </span>
                                            </div>

                                            <h3 className="te-blog-title">
                                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                            </h3>

                                            <p className="te-blog-excerpt">{post.excerpt}</p>

                                            <div className="te-blog-footer">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="te-blog-read-more"
                                                >
                                                    READ MORE{" "}
                                                    <i className="fa-solid fa-arrow-right-long" />
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
