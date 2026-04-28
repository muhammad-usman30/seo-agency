import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Privacy Policy - JAVUSSEO',
    description: 'Read our privacy policy to understand how we collect, use, and protect your personal information.'
};

export default function PrivacyPage() {
    return (
        <>
            <HeroBanner
                title="Privacy Policy"
                subtitle="How we protect and handle your information"
                breadcrumbs={['Home', 'Privacy Policy']}
            />

            <section className="py-20 bg-white">
                <div className="container-custom max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-navy-600">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, including:</p>
                        <ul>
                            <li>Name and contact information</li>
                            <li>Email address and phone number</li>
                            <li>Payment information</li>
                            <li>Website analytics data</li>
                            <li>Communication preferences</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Provide and improve our services</li>
                            <li>Process payments and manage accounts</li>
                            <li>Communicate with you about our services</li>
                            <li>Send marketing communications (with your consent)</li>
                            <li>Comply with legal obligations</li>
                        </ul>

                        <h2>3. Data Security</h2>
                        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

                        <h2>4. Cookies and Tracking</h2>
                        <p>We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.</p>

                        <h2>5. Third-Party Services</h2>
                        <p>We may share your information with third-party service providers who assist us in operating our website and delivering our services, including payment processors and analytics providers.</p>

                        <h2>6. Data Retention</h2>
                        <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law.</p>

                        <h2>7. Your Rights</h2>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul>
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Data portability</li>
                        </ul>

                        <h2>8. Children's Privacy</h2>
                        <p>Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>

                        <h2>9. International Data Transfers</h2>
                        <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.</p>

                        <h2>10. Changes to This Policy</h2>
                        <p>We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.</p>

                        <h2>11. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@JAVUSSEO.com">privacy@JAVUSSEO.com</a></p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}