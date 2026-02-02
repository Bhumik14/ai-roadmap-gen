import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="text-center mt-20">
            <h1 className="text-3xl font-bold mb-4">404</h1>
            <p className="mb-4">Page not found</p>
            <Link to="/" className="text-blue-600 hover:underline">
                Go back home
            </Link>
        </div>
    )
}
