'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { updateSEO } from '@/utils/seo';
import Link from "next/link";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Update SEO metadata for the 404 page
    updateSEO({
      title: 'Page Not Found',
      description: 'The page you were looking for does not exist.',
      url: window.location.href,
    });

    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
