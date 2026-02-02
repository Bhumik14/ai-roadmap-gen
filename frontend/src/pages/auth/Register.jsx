import { Link } from "react-router-dom"

export default function Register() {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Register</h2>

            <form className="space-y-4">
                <input placeholder="Name" />
                <input placeholder="Email" />
                <input placeholder="Password" type="password" />
                <button>Create Account</button>
            </form>

            <p className="mt-4 text-sm">
                Already have an account?
                <Link to="/auth" className="text-blue-600 ml-1">
                    Login
                </Link>
            </p>
        </>
    )
}
