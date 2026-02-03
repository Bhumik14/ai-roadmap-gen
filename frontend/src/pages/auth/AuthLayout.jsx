import { Outlet } from "react-router-dom"

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-10">
            <div className="w-full max-w-md">
                <div className="app-card">
                    <div className="app-card-body">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
