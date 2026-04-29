// Hero slides data
export const heroSlides = [
    {
        id: 1,
        badge: '🚀 Strategy Driven SEO Agency',
        title: {
            line1: 'Higher ranking &',
            line2: 'traffic with our',
            highlight: 'powerful tactics'
        },
        description: 'Creating SEO-optimized website content involves several key strategies and best practices to ensure your website ranks well in search engine results and attracts the right audience.',
        buttons: [
            { label: 'Get Started', href: '/contact', variant: 'primary' },
            { label: 'Learn More', href: '/services', variant: 'outline' }
        ],
        stats: [
            { icon: 'users', value: '50+', label: 'Clients Worldwide' },
            { icon: 'trending', value: '100%', label: 'SEO Results' }
        ],
        image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?w=800',
        imageAlt: 'SEO Strategy Meeting'
    },
    {
        id: 2,
        badge: '🎯 Data-Driven Results',
        title: {
            line1: 'Boost your',
            line2: 'online visibility',
            highlight: 'with proven SEO'
        },
        description: 'Our data-driven approach combines advanced analytics, competitor research, and industry insights to deliver measurable results that grow your business and increase ROI.',
        buttons: [
            { label: 'Start Now', href: '/contact', variant: 'primary' },
            { label: 'View Case Studies', href: '/services', variant: 'outline' }
        ],
        stats: [
            { icon: 'users', value: '50+', label: 'Happy Clients' },
            { icon: 'trending', value: '24/7', label: 'Dedicated Support' }
        ],
        image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=800',
        imageAlt: 'Data Analytics Dashboard'
    },
    {
        id: 3,
        badge: '🏆 Award-Winning Agency',
        title: {
            line1: 'Transform your',
            line2: 'digital presence',
            highlight: 'with expert SEO'
        },
        description: 'Join hundreds of successful businesses that have achieved top rankings and sustainable growth through our comprehensive SEO strategies and dedicated support.',
        buttons: [
            { label: 'Get Free Audit', href: '/contact', variant: 'primary' },
            { label: 'Our Services', href: '/services', variant: 'outline' }
        ],
        stats: [
            { icon: 'users', value: '5+', label: 'Years of Experience' },
            { icon: 'trending', value: '50+', label: 'Projects Completed' }
        ],
        image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?w=800',
        imageAlt: 'Team Collaboration'
    }
];

// Animation variants
export const textVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.4, ease: 'easeIn' } }
};

export const imageVariants = {
    initial: { opacity: 0, x: 100, scale: 0.9 },
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: { opacity: 0, x: -100, scale: 0.9, transition: { duration: 0.4, ease: 'easeIn' } }
};

