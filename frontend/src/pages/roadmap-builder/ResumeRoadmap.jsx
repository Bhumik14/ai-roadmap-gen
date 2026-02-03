function ResumeRoadmap() {
    return (
        <div>
            <h2 className="text-xl font-semibold tracking-tight mb-2">
                Create Roadmap Using Resume
            </h2>

            <p className="text-sm text-slate-600 mb-4">
                Upload your resume and we’ll infer skills and experience.
            </p>

            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                <input type="file" className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-900 file:shadow-sm hover:file:bg-slate-50" />
            </div>

            <p className="text-sm text-slate-500 mt-3">
                You may optionally add goals and duration.
            </p>
        </div>
    )
}

export default ResumeRoadmap
