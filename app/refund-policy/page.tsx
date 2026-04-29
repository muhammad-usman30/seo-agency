// app/refund/page.tsx
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, FileCheck, Clock, Mail, AlertTriangle, Banknote, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Refund Policy - JAVUSSEO',
    description: 'Learn about our refund policy and money-back guarantee for SEO and digital marketing services.'
};

export default function RefundPage() {
    const refundSteps = [
        {
            icon: Mail,
            title: 'Request',
            description: 'Email us with your order number and reason'
        },
        {
            icon: FileCheck,
            title: 'Review',
            description: "We'll review your request within 48 hours"
        },
        {
            icon: Clock,
            title: 'Processing',
            description: 'Refunds processed in 5-7 business days'
        },
        {
            icon: Banknote,
            title: 'Completion',
            description: 'Money returned to original payment method'
        }
    ];

    return (
        <>
            <HeroBanner
                title="Refund Policy"
                subtitle="Our commitment to your satisfaction"
                breadcrumbs={['Home', 'Refund Policy']}
                backgroundURL="https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?w=1600"
            />

            {/* Last Updated Banner */}
            <div className="bg-cream py-3 border-b border-gray-200">
                <div className="container-custom">
                    <p className="text-center text-navy-600 text-sm">
                        📅 Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        {/* 30-Day Guarantee Highlight */}
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 mb-12 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-green-800 mb-3">30-Day Money-Back Guarantee</h2>
                            <p className="text-green-700 mb-4">
                                We offer a 30-day money-back guarantee on all our SEO and digital marketing packages. 
                                If you're not satisfied with our services within the first 30 days, we'll refund your payment in full.
                            </p>
                            <div className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                <Clock className="w-4 h-4" />
                                30 Days Risk-Free
                            </div>
                        </div>

                        {/* Eligibility Section */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 font-bold">✓</span>
                                    </div>
                                    Eligibility for Refund
                                </h3>
                                <ul className="space-y-2 text-navy-600">
                                    <li>• Request within 30 days of initial payment</li>
                                    <li>• Provide a valid reason for dissatisfaction</li>
                                    <li>• Not have violated our terms of service</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-navy-800 mb-4 flex items-center gap-2">
                                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-4 h-4 text-red-600" />
                                    </div>
                                    Non-Refundable Services
                                </h3>
                                <ul className="space-y-2 text-navy-600">
                                    <li>• Custom strategy development (after delivery)</li>
                                    <li>• Content writing services (after delivery)</li>
                                    <li>• Setup fees for initial configuration</li>
                                </ul>
                            </div>
                        </div>

                        {/* How to Request Refund */}
                        <div className="bg-cream rounded-2xl p-8 mb-12">
                            <h3 className="text-2xl font-bold text-navy-800 mb-6 text-center">How to Request a Refund</h3>
                            <div className="grid md:grid-cols-4 gap-6">
                                {refundSteps.map((step, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <step.icon className="w-8 h-8 text-primary-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-primary-600 mb-1">{index + 1}</div>
                                        <h4 className="font-bold text-navy-800">{step.title}</h4>
                                        <p className="text-sm text-navy-500">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="text-center mt-6">
                                <a 
                                    href="mailto:javusseo.com"
                                    className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email javusseo@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-navy-800 mb-3">Partial Refunds</h3>
                                <p className="text-navy-600">
                                    In some cases, we may offer partial refunds for services partially rendered. 
                                    The amount will be prorated based on the time and work completed.
                                </p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-navy-800 mb-3">Processing Time</h3>
                                <p className="text-navy-600">
                                    Refunds are typically processed within 5-7 business days. 
                                    The time it takes for the refund to appear depends on your payment provider.
                                </p>
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
                            <PhoneCall className="w-12 h-12 mx-auto mb-4 opacity-90" />
                            <h3 className="text-xl font-bold mb-2">Questions About Your Refund?</h3>
                            <p className="mb-4 opacity-90">Our support team is here to help you with any questions.</p>
                            <Link 
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-cream transition"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}