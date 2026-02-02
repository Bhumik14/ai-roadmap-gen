import { NavLink, Outlet } from "react-router-dom"

const tabClass = ({ isActive }) =>
    isActive
        ? "border-b-2 border-blue-600 text-blue-600 font-medium pb-2"
        : "text-gray-600 hover:text-blue-600 pb-2"

export default function RoadmapBuilderLayout() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-8">

            {/* Header */}
            <h1 className="text-2xl font-bold mb-6">
                Build Your Roadmap
            </h1>

            {/* Top Options */}
            <div className="flex gap-8 border-b mb-8">
                <NavLink to="" end className={tabClass}>
                    Create with Variables
                </NavLink>

                <NavLink to="resume" className={tabClass}>
                    Create with Resume
                </NavLink>

                <NavLink to="existing" className={tabClass}>
                    Existing Roadmaps
                </NavLink>
            </div>

            {/* Dynamic Content */}
            <Outlet />

        </div>
    )
}


