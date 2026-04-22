export type Blog = {
    title: string;
    excerpt: string;
    date: string;
    slug: string;
};

export const blogHeading = {
    badge: 'Our Blogs',
    title: "Latest Insights",
    subtitle: 'As a process transformation company, we rethinks and rebuilds processes for the digital age.',
    centered: true,
}

export const blogsData: Blog[] = [
    {
        title: 'Strategies for Effective Social Media Marketing',
        excerpt:
            'Digital marketing encompasses a broad spectrum of strategies aimed at building brand presence and engagement...',
        date: 'Dec 15, 2024',
        slug: 'social-media-marketing',
    },
    {
        title: 'How to Optimize for User Experience and Search Rankings',
        excerpt:
            'Improving user experience is key to increasing search visibility and conversion rates across digital platforms...',
        date: 'Dec 10, 2024',
        slug: 'user-experience-optimization',
    },
    {
        title: 'How to Optimize Content for Search Rankings',
        excerpt:
            'Search engine optimization requires a balance between technical structure and high-quality content...',
        date: 'Dec 05, 2024',
        slug: 'search-rankings-optimization',
    },
];