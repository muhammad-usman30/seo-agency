import Link from 'next/link';
import HeroBanner from '@/components/ui/HeroBanner';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <HeroBanner
        title="404 - Page Not Found"
        subtitle="The page you're looking for doesn't exist"
        breadcrumbs={['Home', '404']}
      />
      <div className="py-20 text-center">
        <div className="container-custom">
          <p className="text-navy-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link href="/" className="btn-primary inline-block">
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}