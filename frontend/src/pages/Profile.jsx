function Profile() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
                <p className="mt-1 text-sm text-slate-600">Manage your account settings.</p>
            </div>

            <div className="app-card">
                <div className="app-card-body">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-900">
                            SB
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-900">Study Buddy</p>
                            <p className="text-sm text-slate-600">Profile details coming soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;