import { NavLink } from "react-router-dom"
import { useState } from "react";

const linkClass = ({ isActive }) =>
    isActive
        ? "text-blue-600 font-semibold"
        : "text-gray-700 hover:text-blue-600"


function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 border-b">

            {/* Logo */}
            <div className="font-medium text-gray-800">
                Study Buddy
            </div>

            {/* Links */}
            <div className="flex items-center gap-6">
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/roadmap-build" className={linkClass}>Roadmap</NavLink>
                <NavLink to="/quiz-build" className={linkClass}>Quiz</NavLink>
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                {isLoggedIn ? (
                        <NavLink to="/profile" className={linkClass}>Profile</NavLink>
                    )
                    : (
                        <NavLink to="/auth" className={linkClass}>Login</NavLink>
                    )
                }

            </div>

        </nav>
    )
}

export default NavBar
