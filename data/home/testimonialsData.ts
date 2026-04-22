export type Testimonial = {
    name: string;
    role: string;
    content: string;
    rating: number;
};

export const testimonialHeading = {
    title: "",
    subtitle: "Voices of Our Clients",
}

export const testimonials: Testimonial[] = [
    {
        name: 'John D',
        role: 'Marketing Manager',
        content:
            'From the initial consultation, support digital marketing helped us build strategy and achieve our business goals.',
        rating: 5,
    },
    {
        name: 'David L',
        role: 'Founder Of MS Solutions',
        content:
            'The results speak for themselves. Their strategies and thorough market analysis are unmatched.',
        rating: 5,
    },
    {
        name: 'Emily R',
        role: 'Owner Of Sweet Delights',
        content:
            'Working with [Your Company Name] brought in more qualified leads than ever before. I highly recommend them.',
        rating: 5,
    },
];