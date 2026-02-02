import {Link} from 'react-router-dom';

export default function Login() {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Login</h2>

            <form className="space-y-4">
                <input placeholder="Email" />
                <input placeholder="Password" type="password" />
                <button>Login</button>
            </form>

            <p className="mt-4 text-sm">
                Don’t have an account?
                <Link to="/auth/register" className="text-blue-600 ml-1">
                    Register
                </Link>
            </p>
        </>
    )
}