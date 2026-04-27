// app/terms/page.tsx (Terms of Service)
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Terms of Service - JAVUSSEO',
    description: 'Read our terms of service and understand your rights and obligations when using our SEO services.'
};

export default function TermsPage() {
    return (
        <>
            <HeroBanner
                title="Terms of Service"
                subtitle="Please read these terms carefully before using our services"
                breadcrumbs={['Home', 'Terms of Service']}
            />

            <section className="py-20 bg-white">
                <div className="container-custom max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-navy-600">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2>1. Acceptance of Terms</h2>
                        <p>By accessing and using JAVUSSEO's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

                        <h2>2. Services Description</h2>
                        <p>JAVUSSEO provides SEO optimization, digital marketing, content marketing, and related services to help businesses improve their online presence and search engine rankings.</p>

                        <h2>3. User Obligations</h2>
                        <p>You agree to provide accurate, current, and complete information when using our services. You are responsible for maintaining the confidentiality of your account credentials.</p>

                        <h2>4. Payment Terms</h2>
                        <p>All fees for our services are due as specified in your service agreement. Late payments may result in suspension of services.</p>

                        <h2>5. Intellectual Property</h2>
                        <p>All content, logos, and materials on our website are the property of JAVUSSEO and are protected by copyright laws.</p>

                        <h2>6. Limitation of Liability</h2>
                        <p>JAVUSSEO shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>

                        <h2>7. Termination</h2>
                        <p>We reserve the right to terminate or suspend access to our services immediately, without prior notice, for violations of these Terms.</p>

                        <h2>8. Changes to Terms</h2>
                        <p>We may modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.</p>

                        <h2>9. Contact Information</h2>
                        <p>For questions about these Terms, please contact us at: <a href="mailto:legal@JAVUSSEO.com">legal@JAVUSSEO.com</a></p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}