// app/blog/postsData.ts

export type BlogPost = {
    slug: string;
    title: string;
    date: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    excerpt: string;
    content: string[];
};

export const blogPosts: BlogPost[] = [
    {
        slug: "electrical-system-repair",
        title: "Electrical System Repair: Keep Your Car Powered Safely",
        date: "March 30, 2025",
        author: "Admin",
        category: "Repair",
        readTime: "6 min read",
        image: "/images/blog.png", // use any image you have
        excerpt:
            "Flickering lights? Slow cranking? Your vehicle’s electrical system may be trying to tell you something.",
        content: [
            "Your car’s electrical system powers everything from ignition and charging to safety and comfort systems. When something goes wrong, it can show up as dim lights, warning messages, or a car that refuses to start.",
            "At Wabi Auto, we test the battery, alternator, starter, and wiring to find the real cause of the issue. Instead of just replacing parts, we diagnose the system as a whole to avoid repeat problems.",
            "Regular inspections and proper maintenance help prevent breakdowns, protect sensitive electronics, and keep you confident every time you turn the key."
        ]
    },
    {
        slug: "sample-post",
        title: "Essential Car Maintenance Tips for Every Driver",
        date: "March 10, 2025",
        author: "Admin",
        category: "Maintenance",
        readTime: "5 min read",
        image: "/images/blog.png",
        excerpt:
            "This sample article shows how your blog details page looks. You can replace it with real content any time.",
        content: [
            "Use this sample post to preview your blog layout, typography, and spacing. Once you're happy with the design, you can start adding real articles that answer common customer questions and showcase your expertise.",
            "You might write about topics like seasonal maintenance checklists, how to know when brakes or tires need attention, or what to expect from a full diagnostic inspection.",
            "Blog posts are a great way to build trust and help drivers understand why quality repairs and regular service matter."
        ]
    },
    {
        slug: "air-conditioning-maintenance",
        title: "Air Conditioning Maintenance for Every Season",
        date: "April 25, 2025",
        author: "Admin",
        category: "Maintenance",
        readTime: "5 min read",
        image: "/images/blog.png",
        excerpt:
            "Don’t wait until the hottest week of the year to discover your A/C isn’t working.",
        content: [
            "Proper A/C maintenance keeps you comfortable and prevents expensive component failures. A simple leak or low refrigerant can make the entire system work harder than it should.",
            "Our technicians check system pressure, look for leaks, inspect belts, and verify that the cabin air filter is clean so you get strong, cold airflow.",
            "If you notice strange smells, weak airflow, or warm air from the vents, it’s time to have your A/C system inspected."
        ]
    },
    {
        slug: "interior-detailing-upholstery",
        title: "Interior Detailing & Upholstery: Refresh Your Cabin",
        date: "May 20, 2025",
        author: "Admin",
        category: "Detailing",
        readTime: "7 min read",
        image: "/images/blog.png",
        excerpt:
            "A clean, comfortable interior makes every drive feel better – whether it’s your daily commute or a road trip.",
        content: [
            "Interior detailing goes beyond a quick vacuum. We remove deep dirt, stains, and odors from carpets, seats, and panels.",
            "From fabric shampooing to leather conditioning, our team restores the look and feel of your cabin while protecting materials from wear and UV damage.",
            "Regular detailing also helps maintain the value of your vehicle and makes it a more pleasant place for family, friends, and clients."
        ]
    }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}
