// app/contact/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { MessageCircle, Mail, Phone, MapPin, Send } from 'lucide-react';
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';
import GradientPlaceholder from '@/components/ui/GradientPlaceholder';

const contactSchema = z.object({
    firstName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'contacts'), {
                ...data,
                createdAt: new Date(),
            });
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            reset();
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <HeroBanner
                title="Contact Us"
                subtitle="Get in touch with our team"
                breadcrumbs={['Home', 'Contact Us']}
            />

            <section className="py-20 bg-cream">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div>
                            <div className="grid gap-6">
                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <MessageCircle className="w-10 h-10 text-primary-500 mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Chat With Us</h3>
                                    <p className="text-navy-600 mb-4">Speak to our friendly team via live chat.</p>
                                    <button className="text-primary-600 font-semibold hover:text-primary-700">
                                        Start A Live Chat →
                                    </button>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <Mail className="w-10 h-10 text-primary-500 mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Email Us</h3>
                                    <p className="text-navy-600 mb-4">Shoot us an email anytime.</p>
                                    <a href="mailto:javusseo@gmail.com" className="text-primary-600 font-semibold">
                                        javusseo@gmail.com →
                                    </a>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <Phone className="w-10 h-10 text-primary-500 mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Call Us</h3>
                                    <p className="text-navy-600 mb-2">Mon-Fri from 8am to 5pm</p>
                                    <a href="tel:+919943430343" className="text-2xl font-bold text-primary-600">
                                        +91 994 343 0343
                                    </a>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-lg">
                                    <MapPin className="w-10 h-10 text-primary-500 mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Visit Us</h3>
                                    <p className="text-navy-600">S.G High Way, Ahmedabad - 454545</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <h2 className="text-3xl font-bold mb-6">Send Message</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                                    <input
                                        {...register('firstName')}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
                                        placeholder="John Doe"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Email *</label>
                                    <input
                                        {...register('email')}
                                        type="email"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
                                        placeholder="john@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Phone *</label>
                                    <input
                                        {...register('phone')}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
                                        placeholder="+1 234 567 890"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Website</label>
                                    <input
                                        {...register('website')}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
                                        placeholder="https://example.com"
                                    />
                                    {errors.website && (
                                        <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Message *</label>
                                    <textarea
                                        {...register('message')}
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition"
                                        placeholder="Tell us about your project..."
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="mt-12">
                        <iframe
                            src="https://www.google.com/maps?q=Lahore,Punjab,Pakistan&output=embed"
                            width="100%"
                            height="500"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lahore Map"
                            className='rounded-xl'
                        ></iframe>
                        {/* <GradientPlaceholder aspectRatio="video" label="Map Location" /> */}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
