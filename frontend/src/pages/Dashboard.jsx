function Dashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                <p className="mt-1 text-sm text-slate-600">Your progress and saved roadmaps will appear here.</p>
            </div>

            <div className="app-card">
                <div className="app-card-body">
                    <p className="text-sm font-medium text-slate-900">Nothing to show yet</p>
                    <p className="mt-1 text-sm text-slate-600">
                        Build a roadmap to start tracking your learning journey.
                    </p>
                    <div className="mt-4">
                        <a className="app-button" href="/roadmap-build">Build a roadmap</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;