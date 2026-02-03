export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="app-container py-10 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left */}
                <p className="text-sm text-slate-600">
                    © {new Date().getFullYear()} Study Buddy. All rights reserved.
                </p>

                {/* Right */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                    <a href="#" className="text-slate-600 hover:text-blue-700">
                        About
                    </a>
                    <a href="#" className="text-slate-600 hover:text-blue-700">
                        Roadmaps
                    </a>
                    <a href="#" className="text-slate-600 hover:text-blue-700">
                        Contact
                    </a>
                    <a href="#" className="text-slate-600 hover:text-blue-700">
                        Privacy
                    </a>
                </div>

            </div>
        </footer>
    )
}
