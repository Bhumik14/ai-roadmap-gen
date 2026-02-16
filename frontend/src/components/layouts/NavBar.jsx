import { NavLink } from "react-router-dom"
import { useState } from "react";

const linkClass = ({ isActive }) =>
    isActive
        ? "text-blue-700 font-semibold"
        : "text-slate-700 hover:text-blue-700"


function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
            <nav className="app-container flex items-center justify-between py-4">

                {/* Logo */}
                <div className="font-semibold tracking-tight text-slate-900">
                    Study Buddy
                </div>

                {/* Links */}
                <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm">
                    <NavLink to="/" className={linkClass}>Home</NavLink>
                    <NavLink to="/roadmap-build" className={linkClass}>Roadmap</NavLink>
                    <NavLink to="/quiz" className={linkClass}>Quiz</NavLink>
                    <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                    {isLoggedIn ? (
                            <NavLink to="/profile" className={linkClass}>Profile</NavLink>
                        )
                        : (
                            <NavLink
                                to="/auth"
                                className={({ isActive }) =>
                                    isActive
                                        ? "app-button"
                                        : "app-button-secondary"
                                }
                            >
                                Login
                            </NavLink>
                        )
                    }

                </div>

            </nav>
        </header>
    )
}

export default NavBar
