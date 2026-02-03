import { NavLink, Outlet } from "react-router-dom"

const tabClass = ({ isActive }) =>
    isActive
        ? "border-b-2 border-blue-700 text-blue-700 font-semibold pb-3"
        : "text-slate-600 hover:text-blue-700 pb-3"

export default function RoadmapBuilderLayout() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Build Your Roadmap
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Choose an input method and generate a personalized study plan.
                </p>
            </div>

            {/* Top Options */}
            <div className="app-card">
                <div className="app-card-body">
                    <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-slate-200">
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

                    <div className="pt-6">
                        {/* Dynamic Content */}
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}


