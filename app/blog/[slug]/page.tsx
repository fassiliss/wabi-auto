// app/blog/[slug]/page.tsx

import { blogPosts, getPostBySlug } from "../postsData";
import Link from "next/link";

type PageProps = {
    params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
    // ✅ Unwrap the Promise coming from Next.js
    const { slug } = await params;

    const post = getPostBySlug(slug);

    // 🔍 DEBUG INFO if something goes wrong
    const debugInfo = {
        slugParam: slug,
        knownSlugs: blogPosts.map((p) => p.slug),
    };

    if (!post) {
        return (
            <div style={{ padding: "80px", maxWidth: 800, margin: "0 auto" }}>
                <h1>Post not found</h1>
                <p>The blog post you are looking for does not exist.</p>

                <h3 style={{ marginTop: "2rem" }}>Debug info</h3>
                <pre
                    style={{
                        textAlign: "left",
                        background: "#111",
                        color: "#0f0",
                        padding: "16px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        overflowX: "auto",
                    }}
                >
{JSON.stringify(debugInfo, null, 2)}
        </pre>

                <p style={{ marginTop: "1rem" }}>
                    <Link href="/blog" style={{ color: "#ff4a17" }}>
                        ← Back to Blog
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className="container te-py-120">
            <h1 className="mb-3">{post.title}</h1>

            <p className="text-muted">
                {post.date} • {post.author} • {post.readTime}
            </p>

            <img
                src={post.image}
                alt={post.title}
                className="img-fluid mb-4"
                style={{ borderRadius: "8px" }}
            />

            <p className="lead">{post.excerpt}</p>

            {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}

            <hr className="my-5" />

            <Link href="/blog" className="te-theme-btn">
                ← Back to Blog
            </Link>
        </div>
    );
}
