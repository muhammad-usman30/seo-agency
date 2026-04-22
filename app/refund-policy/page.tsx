// app/refund/page.tsx (Refund Policy)
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Refund Policy - SEORE',
    description: 'Learn about our refund policy and money-back guarantee for SEO and digital marketing services.'
};

export default function RefundPage() {
    return (
        <>
            <HeroBanner
                title="Refund Policy"
                subtitle="Our commitment to your satisfaction"
                breadcrumbs={['Home', 'Refund Policy']}
            />

            <section className="py-20 bg-white">
                <div className="container-custom max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                        <p className="text-navy-600">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2>1. 30-Day Money-Back Guarantee</h2>
                        <p>We offer a 30-day money-back guarantee on all our SEO and digital marketing packages. If you're not satisfied with our services within the first 30 days, we'll refund your payment in full.</p>

                        <h2>2. Eligibility for Refund</h2>
                        <p>To be eligible for a refund, you must:</p>
                        <ul>
                            <li>Request the refund within 30 days of your initial payment</li>
                            <li>Provide a valid reason for dissatisfaction</li>
                            <li>Not have violated our terms of service</li>
                        </ul>

                        <h2>3. Non-Refundable Services</h2>
                        <p>The following services are non-refundable:</p>
                        <ul>
                            <li>Custom strategy development (after delivery)</li>
                            <li>Content writing services (after delivery)</li>
                            <li>Setup fees for initial configuration</li>
                        </ul>

                        <h2>4. How to Request a Refund</h2>
                        <p>To request a refund, please:</p>
                        <ol>
                            <li>Email us at <a href="mailto:refunds@seore.com">refunds@seore.com</a></li>
                            <li>Include your order number and reason for refund</li>
                            <li>Allow 5-7 business days for processing</li>
                        </ol>

                        <h2>5. Partial Refunds</h2>
                        <p>In some cases, we may offer partial refunds for services partially rendered. The amount will be prorated based on the time and work completed.</p>

                        <h2>6. Processing Time</h2>
                        <p>Refunds are typically processed within 5-7 business days. The time it takes for the refund to appear in your account depends on your payment provider.</p>

                        <h2>7. Chargebacks</h2>
                        <p>Please contact us first before initiating a chargeback. Unauthorized chargebacks may result in account termination and legal action.</p>

                        <h2>8. Contact Us</h2>
                        <p>For refund-related questions, contact us at: <a href="mailto:refunds@seore.com">refunds@seore.com</a></p>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}