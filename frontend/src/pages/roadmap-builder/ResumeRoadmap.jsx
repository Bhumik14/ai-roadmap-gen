import { useState } from "react";
import { api } from "../../lib/api";

function ResumeRoadmap() {
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [learningGoals, setLearningGoals] = useState("");
    const [duration, setDuration] = useState("");
    const [roadmap, setRoadmap] = useState(null);

    // Handle file selection
    function handleFileChange(e) {
        setResumeFile(e.target.files[0]);
    }

    // Upload resume to backend
    async function handleUpload() {
        if (!resumeFile) {
            alert("Upload Resume First...");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();

            // File
            formData.append("resume", resumeFile);

            // Optional fields
            formData.append("goals", learningGoals);
            formData.append("duration", duration);
            console.log(formData);
            // Send to backend
            const response = await api.post(
                "/ai-services/create-roadmap-resume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Roadmap Response:", response.data);
            setRoadmap(response.data.roadmap);

            alert("Roadmap Created Successfully!");

        } catch (error) {
            console.error("Error in roadmap creation :", error.response?.data || error.message);
        }

        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-10">

                {/* ---------- HEADER ---------- */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Resume Roadmap Generator 🚀
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Upload your resume and get a personalized learning roadmap powered by AI.
                    </p>
                </div>

                {/* ---------- UPLOAD CARD ---------- */}
                <div className="bg-white rounded-2xl shadow-md p-6 space-y-5 border">

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Upload Resume (PDF)
                        </label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="block w-full text-sm file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0 file:bg-slate-900 file:text-white
              hover:file:bg-slate-700 cursor-pointer"
                        />

                        {resumeFile && (
                            <p className="mt-2 text-sm text-green-600 font-medium">
                                ✅ Selected: {resumeFile.name}
                            </p>
                        )}
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            className="border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
                            placeholder="Learning Goal (e.g. Data Analyst)"
                            value={learningGoals}
                            onChange={(e) => setLearningGoals(e.target.value)}
                        />

                        <input
                            className="border rounded-xl p-3 focus:ring-2 focus:ring-black outline-none"
                            placeholder="Duration (e.g. 3 months)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleUpload}
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white
            bg-black hover:bg-slate-800 transition disabled:opacity-50"
                    >
                        {loading ? "Generating Roadmap..." : "Generate Roadmap ✨"}
                    </button>
                </div>

                {/* ---------- ROADMAP OUTPUT ---------- */}
                {roadmap && (
                    <div className="space-y-8">

                        {/* Metadata */}
                        <div className="bg-white rounded-2xl shadow p-6 border">
                            <h2 className="text-2xl font-bold text-slate-900">
                                🎯 Roadmap for {roadmap.metadata.goal}
                            </h2>

                            <div className="mt-3 flex flex-wrap gap-3">
                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                    Level: {roadmap.metadata.experience_level}
                                </span>

                                <span className="px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-700">
                                    Duration: {roadmap.metadata.time_commitment}
                                </span>
                            </div>
                        </div>

                        {/* Phases Accordion */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-slate-800">
                                📚 Learning Phases
                            </h3>

                            <div className="space-y-4">
                                {roadmap.phases.map((phase) => (
                                    <details
                                        key={phase.phase_id}
                                        className="bg-white border rounded-2xl shadow-sm p-5"
                                    >
                                        <summary className="cursor-pointer font-semibold text-lg text-slate-900">
                                            Phase {phase.phase_id}: {phase.phase_title}
                                            <span className="ml-2 text-sm text-slate-500">
                                                ({phase.duration})
                                            </span>
                                        </summary>

                                        {/* Topics */}
                                        <div className="mt-4 space-y-4">
                                            {phase.topics.map((topic, i) => (
                                                <div key={i} className="pl-3 border-l-4 border-slate-200">
                                                    <h4 className="font-medium text-slate-800">
                                                        {topic.topic_name}
                                                        <span className="ml-2 text-xs text-slate-500">
                                                            ({topic.priority})
                                                        </span>
                                                    </h4>

                                                    <ul className="list-disc ml-6 mt-2 text-sm text-slate-600 space-y-1">
                                                        {topic.subtopics.map((sub, j) => (
                                                            <li key={j}>{sub}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}

                                            {/* Milestones */}
                                            {phase.milestones && (
                                                <div>
                                                    <h5 className="font-semibold text-slate-700 mt-4">
                                                        ✅ Milestones
                                                    </h5>
                                                    <ul className="list-disc ml-6 text-sm text-slate-600 mt-2 space-y-1">
                                                        {phase.milestones.map((m, k) => (
                                                            <li key={k}>{m}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>

                        {/* Projects */}
                        {roadmap.projects?.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold mb-4 text-slate-800">
                                    🚀 Projects to Build
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {roadmap.projects.map((proj, i) => (
                                        <div
                                            key={i}
                                            className="bg-white border rounded-2xl shadow p-5"
                                        >
                                            <h4 className="font-semibold text-slate-900">
                                                {proj.project_title}
                                            </h4>

                                            <p className="text-sm text-slate-600 mt-2">
                                                {proj.description}
                                            </p>

                                            <p className="text-xs text-slate-500 mt-3">
                                                Skills: {proj.skills_covered.join(", ")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Assessment */}
                        {roadmap.assessment?.self_check_questions && (
                            <div className="bg-white border rounded-2xl shadow p-6">
                                <h3 className="text-xl font-bold text-slate-800">
                                    📝 Self Assessment
                                </h3>

                                <ul className="mt-4 space-y-2">
                                    {roadmap.assessment.self_check_questions.map((q, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-slate-700"
                                        >
                                            <span className="mt-1">✔</span>
                                            <span>{q}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ResumeRoadmap;
