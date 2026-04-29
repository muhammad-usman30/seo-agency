// app/terms/page.tsx
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';
import { Shield, FileText, Users, CreditCard, Lock, AlertCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service - JAVUSSEO',
    description: 'Read our terms of service and understand your rights and obligations when using our SEO services.'
};

export default function TermsPage() {
    const sections = [
        {
            icon: Shield,
            title: '1. Acceptance of Terms',
            content: 'By accessing and using JAVUSSEO\'s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
        },
        {
            icon: FileText,
            title: '2. Services Description',
            content: 'JAVUSSEO provides SEO optimization, digital marketing, content marketing, and related services to help businesses improve their online presence and search engine rankings.'
        },
        {
            icon: Users,
            title: '3. User Obligations',
            content: 'You agree to provide accurate, current, and complete information when using our services. You are responsible for maintaining the confidentiality of your account credentials.'
        },
        {
            icon: CreditCard,
            title: '4. Payment Terms',
            content: 'All fees for our services are due as specified in your service agreement. Late payments may result in suspension of services.'
        },
        {
            icon: Lock,
            title: '5. Intellectual Property',
            content: 'All content, logos, and materials on our website are the property of JAVUSSEO and are protected by copyright laws.'
        },
        {
            icon: AlertCircle,
            title: '6. Limitation of Liability',
            content: 'JAVUSSEO shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.'
        },
        {
            icon: AlertCircle,
            title: '7. Termination',
            content: 'We reserve the right to terminate or suspend access to our services immediately, without prior notice, for violations of these Terms.'
        },
        {
            icon: Shield,
            title: '8. Changes to Terms',
            content: 'We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.'
        },
        {
            icon: Mail,
            title: '9. Contact Information',
            content: 'For questions about these Terms, please contact us at: legal@JAVUSSEO.com'
        }
    ];

    return (
        <>
            <HeroBanner
                title="Terms of Service"
                subtitle="Please read these terms carefully before using our services"
                breadcrumbs={['Home', 'Terms of Service']}
                backgroundURL="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?w=1600"
            />

            {/* Last Updated Banner */}
            <div className="bg-cream py-3 border-b border-gray-200">
                <div className="container-custom">
                    <p className="text-center text-navy-600 text-sm">
                        📅 Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* Introduction Card */}
                        <div className="bg-gradient-to-r from-primary-50 to-cream rounded-2xl p-8 mb-12 text-center">
                            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-10 h-10 text-primary-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-navy-800 mb-3">Our Commitment to Transparency</h2>
                            <p className="text-navy-600">
                                These terms outline the agreement between JAVUSSEO and our valued clients. 
                                We believe in clear communication and fair business practices.
                            </p>
                        </div>

                        {/* Terms Sections Grid */}
                        <div className="space-y-6">
                            {sections.map((section, index) => (
                                <div key={index} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                                                <section.icon className="w-6 h-6 text-primary-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-navy-800 mb-2">{section.title}</h3>
                                            <p className="text-navy-600 leading-relaxed">{section.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-12 bg-navy-50 rounded-2xl p-8 text-center">
                            <h3 className="text-xl font-bold text-navy-800 mb-3">Have Questions?</h3>
                            <p className="text-navy-600 mb-4">
                                Our legal team is here to help clarify any of these terms.
                            </p>
                            <Link 
                                href="/contact" 
                                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                            >
                                Contact Our Team
                                <Mail className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}