import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="py-14">
            <div className="mx-auto max-w-lg app-card">
                <div className="app-card-body text-center">
                    <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                        404
                    </div>
                    <h1 className="mt-4 text-2xl font-semibold tracking-tight">Page not found</h1>
                    <p className="mt-1 text-sm text-slate-600">The page you’re looking for doesn’t exist.</p>
                    <div className="mt-6">
                        <Link to="/" className="app-button">
                            Go back home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
