// app/privacy/page.tsx
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';
import { Shield, Eye, Database, Cookie, Share2, Lock, Users, Globe, Edit, Mail } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy - JAVUSSEO',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.'
};

export default function PrivacyPage() {
    const sections = [
        { icon: Database, title: 'Information We Collect', color: 'blue' },
        { icon: Eye, title: 'How We Use Your Information', color: 'green' },
        { icon: Lock, title: 'Data Security', color: 'purple' },
        { icon: Cookie, title: 'Cookies and Tracking', color: 'orange' },
        { icon: Share2, title: 'Third-Party Services', color: 'indigo' },
        { icon: Database, title: 'Data Retention', color: 'cyan' },
        { icon: Users, title: 'Your Rights', color: 'pink' },
        { icon: Shield, title: "Children's Privacy", color: 'teal' },
        { icon: Globe, title: 'International Data Transfers', color: 'yellow' },
        { icon: Edit, title: 'Changes to This Policy', color: 'gray' },
        { icon: Mail, title: 'Contact Us', color: 'red' }
    ];

    const rightsList = [
        'Access your personal information',
        'Correct inaccurate information',
        'Request deletion of your information',
        'Opt-out of marketing communications',
        'Data portability'
    ];

    return (
        <>
            <HeroBanner
                title="Privacy Policy"
                subtitle="How we protect and handle your information"
                breadcrumbs={['Home', 'Privacy Policy']}
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
                        {/* Trust Badge */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <Shield className="w-4 h-4" />
                                Your Privacy Matters
                            </div>
                            <h2 className="text-3xl font-bold text-navy-800 mb-4">We Respect Your Privacy</h2>
                            <p className="text-navy-600">
                                At JAVUSSEO, we are committed to protecting your personal information 
                                and being transparent about how we use it.
                            </p>
                        </div>

                        {/* Information Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                                <h3 className="text-lg font-bold text-navy-800 mb-3 flex items-center gap-2">
                                    <Database className="w-5 h-5 text-blue-600" />
                                    Information We Collect
                                </h3>
                                <ul className="space-y-1 text-navy-600">
                                    <li>• Name and contact information</li>
                                    <li>• Email address and phone number</li>
                                    <li>• Payment information</li>
                                    <li>• Website analytics data</li>
                                    <li>• Communication preferences</li>
                                </ul>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
                                <h3 className="text-lg font-bold text-navy-800 mb-3 flex items-center gap-2">
                                    <Eye className="w-5 h-5 text-green-600" />
                                    How We Use Your Information
                                </h3>
                                <ul className="space-y-1 text-navy-600">
                                    <li>• Provide and improve our services</li>
                                    <li>• Process payments and manage accounts</li>
                                    <li>• Communicate about our services</li>
                                    <li>• Send marketing (with consent)</li>
                                    <li>• Comply with legal obligations</li>
                                </ul>
                            </div>
                        </div>

                        {/* Your Rights Section */}
                        <div className="bg-indigo-50 rounded-2xl p-8 mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="w-8 h-8 text-indigo-600" />
                                <h3 className="text-2xl font-bold text-navy-800">Your Rights</h3>
                            </div>
                            <p className="text-navy-600 mb-4">Depending on your location, you may have the right to:</p>
                            <div className="grid md:grid-cols-2 gap-3">
                                {rightsList.map((right, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                        <span className="text-navy-600">{right}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Security & Cookies */}
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-navy-800 mb-3 flex items-center gap-2">
                                    <Lock className="w-5 h-5 text-primary-600" />
                                    Data Security
                                </h3>
                                <p className="text-navy-600">
                                    We implement appropriate technical and organizational measures to protect your 
                                    personal information against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-navy-800 mb-3 flex items-center gap-2">
                                    <Cookie className="w-5 h-5 text-orange-600" />
                                    Cookies and Tracking
                                </h3>
                                <p className="text-navy-600">
                                    We use cookies and similar tracking technologies to enhance your experience. 
                                    You can control cookie preferences through your browser settings.
                                </p>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-gradient-to-r from-primary-50 to-cream rounded-2xl p-8 text-center">
                            <Mail className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-navy-800 mb-2">Have Questions?</h3>
                            <p className="text-navy-600 mb-4">
                                If you have questions about this Privacy Policy, please contact us.
                            </p>
                            <a 
                                href="mailto:javusseo@gmail.com"
                                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
                            >
                                javusseo@gmail.com
                                <Mail className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}