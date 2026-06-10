import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background-light px-6 py-24">
      <h1 className="text-9xl font-display font-bold italic text-gray-900">404</h1>
      <p className="mt-6 text-lg text-gray-500 text-center max-w-md">
        Looks like you wandered off the map.
      </p>
      <Link
        to="/projects"
        className="mt-10 btn-primary py-3 px-8 text-sm"
      >
        Take me back to projects
      </Link>
    </div>
  );
}
