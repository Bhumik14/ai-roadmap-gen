function Home() {
    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div>
                <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                    AI-powered roadmaps
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                    Study Buddy
                </h1>
                <p className="mt-3 text-base text-slate-600">
                    Generate a personalized roadmap based on your role, experience, and goals.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                    <a className="app-button" href="/roadmap-build">Build a roadmap</a>
                    <a className="app-button-secondary" href="/auth">Login</a>
                </div>
            </div>

            <div className="app-card">
                <div className="app-card-body">
                    <p className="text-sm font-semibold text-slate-900">What you can do</p>
                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 p-4">
                            <p className="text-sm font-medium">Variables-based</p>
                            <p className="mt-1 text-sm text-slate-600">Enter role, skills, goals and duration.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 p-4">
                            <p className="text-sm font-medium">Resume-based</p>
                            <p className="mt-1 text-sm text-slate-600">Upload a resume to infer your profile.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 p-4">
                            <p className="text-sm font-medium">Quizzes</p>
                            <p className="mt-1 text-sm text-slate-600">Assess understanding as you learn.</p>
                        </div>
                        <div className="rounded-xl border border-slate-200 p-4">
                            <p className="text-sm font-medium">Dashboard</p>
                            <p className="mt-1 text-sm text-slate-600">Track progress over time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;