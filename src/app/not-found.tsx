import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Oops! The page you are looking for does not exist.
        <br />
        It might have been moved or deleted.
      </p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
        Go to Homepage
      </Link>
    </div>
  );
}