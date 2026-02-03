import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
                <p className="mt-1 text-sm text-slate-600">Login to continue building your roadmap.</p>
            </div>

            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <input className="app-input" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Password</label>
                    <input className="app-input" placeholder="••••••••" type="password" />
                </div>
                <button className="app-button w-full" type="submit">Login</button>
            </form>

            <p className="mt-4 text-sm">
                Don’t have an account?
                <Link to="/auth/register" className="text-blue-700 hover:underline ml-1">
                    Register
                </Link>
            </p>
        </>
    )
}