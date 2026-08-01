import Link from 'next/link';

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <i className="fa-solid fa-newspaper text-6xl text-gray-300 mb-4"></i>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist or may have been removed.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
          >
            <i className="fa-solid fa-arrow-start"></i>
            Back to Blog
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Looking for something specific?</p>
            <Link href="/blog/search" className="text-primary-600 hover:text-primary-700 underline">
              Try searching our blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
