import { NavLink, Outlet } from "react-router-dom"

const tabClass = ({ isActive }) =>
    isActive
        ? "border-b-2 border-blue-700 text-blue-700 font-semibold pb-3"
        : "text-slate-600 hover:text-blue-700 pb-3"

export default function QuizPageLayout() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Quiz Builder
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                    Create quizzes interactively or generate them from study resources.
                </p>
            </div>

            {/* Quiz Options Card */}
            <div className="app-card">
                <div className="app-card-body">

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-slate-200">
                        <NavLink to="" end className={tabClass}>
                            Interactive Quiz Bot
                        </NavLink>

                        <NavLink to="pdf" className={tabClass}>
                            Quiz From PDF
                        </NavLink>
                    </div>

                    {/* Dynamic Section */}
                    <div className="pt-6">
                        <Outlet />
                    </div>
                </div>
            </div>

        </div>
    )
}
