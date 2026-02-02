export default function Footer() {
    return (
        <footer className="border-t bg-gray-100 mt-12">
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Left */}
                <p className="text-sm text-gray-600">
                    © {new Date().getFullYear()} Study Buddy. All rights reserved.
                </p>

                {/* Right */}
                <div className="flex gap-6 text-sm">
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                        About
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                        Roadmaps
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                        Contact
                    </a>
                    <a href="#" className="text-gray-600 hover:text-blue-600">
                        Privacy
                    </a>
                </div>

            </div>
        </footer>
    )
}
