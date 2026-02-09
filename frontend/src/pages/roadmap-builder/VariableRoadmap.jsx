import { useState } from "react";
import { api } from "../../lib/api.js";

function VariableRoadmap() {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        skills: [],
        goals: [],
        duration: ""
    });

    // ✅ roadmap response state
    const [roadmap, setRoadmap] = useState(null);

    // ✅ loading + error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function addItem(type) {
        const value = prompt(`Enter a ${type.slice(0, -1)}`);
        if (!value) return;

        setFormData(prev => ({
            ...prev,
            [type]: [...prev[type], value.trim()]
        }));
    }

    function removeItem(type, index) {
        setFormData(prev => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index)
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        setError("");
        setRoadmap(null);

        try {
            const response = await api.post("/ai-services/create-roadmap", {
                target_role: formData.role,
                experience: formData.experience,
                skills: formData.skills,
                goals: formData.goals,
                duration: formData.duration
            });

            console.log("API Response:", response.data);

            // ✅ Save roadmap response
            setRoadmap(response.data.roadmap);

        } catch (err) {
            console.error(err);
            setError("Something went wrong while generating roadmap.");
        }

        setLoading(false);
    }

    return (
        <div className="max-w-3xl space-y-8">

            {/* ---------- FORM ---------- */}
            <div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Create Roadmap Using Variables
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        Add your context and we’ll generate a roadmap aligned to your goal.
                    </p>
                </div>

                <div className="app-card">
                    <div className="app-card-body">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* ROLE + EXPERIENCE */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Target Role
                                    </label>
                                    <input
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="app-input"
                                        placeholder="e.g., Frontend Engineer"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">
                                        Current Experience
                                    </label>
                                    <input
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="app-input"
                                        placeholder="e.g., 1 year React"
                                    />
                                </div>
                            </div>

                            {/* SKILLS */}
                            <div>
                                <label className="font-medium">Skills</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="app-badge bg-blue-50 text-blue-700"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeItem("skills", index)}
                                                className="ml-2 text-slate-500 hover:text-red-600"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addItem("skills")}
                                    className="mt-3 app-button-secondary"
                                >
                                    + Add Skill
                                </button>
                            </div>

                            {/* GOALS */}
                            <div>
                                <label className="font-medium">Goals</label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formData.goals.map((goal, index) => (
                                        <span
                                            key={index}
                                            className="app-badge bg-emerald-50 text-emerald-700"
                                        >
                                            {goal}
                                            <button
                                                type="button"
                                                onClick={() => removeItem("goals", index)}
                                                className="ml-2 text-slate-500 hover:text-red-600"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => addItem("goals")}
                                    className="mt-3 app-button-secondary"
                                >
                                    + Add Goal
                                </button>
                            </div>

                            {/* DURATION */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">
                                    Duration
                                </label>
                                <input
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="app-input"
                                    placeholder="e.g., 3 months"
                                />
                            </div>

                            {/* SUBMIT */}
                            <button type="submit" className="app-button w-full">
                                {loading ? "Generating..." : "Generate Roadmap"}
                            </button>

                            {/* ERROR */}
                            {error && (
                                <p className="text-red-600 text-sm mt-2">{error}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            {/* ---------- ROADMAP OUTPUT ---------- */}
            {roadmap && (
                <div className="app-card">
                    <div className="app-card-body space-y-6">

                        {/* METADATA */}
                        {roadmap.metadata && (
                            <>
                                <h2 className="text-xl font-bold">
                                    🎯 Roadmap for {roadmap.metadata.role || "Unknown Role"}
                                </h2>

                                {roadmap.metadata.goal && (
                                    <p className="text-slate-600">
                                        Goal: {roadmap.metadata.goal}
                                    </p>
                                )}

                                {roadmap.metadata.experience_level && (
                                    <p className="text-sm text-slate-500">
                                        Experience Level: {roadmap.metadata.experience_level}
                                    </p>
                                )}
                            </>
                        )}

                        {/* OVERVIEW */}
                        {roadmap.roadmap_overview && (
                            <div>
                                <h3 className="text-lg font-semibold">📌 Overview</h3>
                                <p className="text-slate-600 mt-1">
                                    {roadmap.roadmap_overview}
                                </p>
                            </div>
                        )}

                        {/* PHASES */}
                        {roadmap.phases?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">
                                    📚 Learning Phases
                                </h3>

                                {roadmap.phases.map((phase) => (
                                    <div
                                        key={phase.phase_id}
                                        className="p-4 border rounded-xl mb-4"
                                    >
                                        {/* Phase Title */}
                                        <h4 className="font-semibold">
                                            Phase {phase.phase_id}: {phase.phase_title || "Untitled"}
                                        </h4>

                                        {/* Duration */}
                                        {phase.duration && (
                                            <p className="text-sm text-slate-500">
                                                ⏳ {phase.duration}
                                            </p>
                                        )}

                                        {/* Objective */}
                                        {phase.objective && (
                                            <p className="text-slate-600 mt-2">
                                                {phase.objective}
                                            </p>
                                        )}

                                        {/* Topics */}
                                        {phase.topics?.length > 0 && (
                                            <div className="mt-3">
                                                <h5 className="font-medium">Topics:</h5>

                                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                                    {phase.topics.map((topic, i) => (
                                                        <li key={i}>
                                                            <b>{topic.topic_name}</b>

                                                            {/* Subtopics */}
                                                            {topic.subtopics?.length > 0 && (
                                                                <ul className="list-circle pl-6 mt-1 text-sm text-slate-600">
                                                                    {topic.subtopics.map((sub, j) => (
                                                                        <li key={j}>{sub}</li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {/* Hands-On */}
                                        {phase.hands_on && (
                                            <div className="mt-4">
                                                <h5 className="font-medium">🛠 Hands-On Practice</h5>

                                                {phase.hands_on.exercises?.length > 0 && (
                                                    <ul className="list-disc pl-6 mt-2 text-sm">
                                                        {phase.hands_on.exercises.map((ex, i) => (
                                                            <li key={i}>{ex}</li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {phase.hands_on.mini_project && (
                                                    <p className="mt-2 text-sm text-slate-600">
                                                        Mini Project: {phase.hands_on.mini_project}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Milestones */}
                                        {phase.milestones?.length > 0 && (
                                            <div className="mt-4">
                                                <h5 className="font-medium">✅ Milestones</h5>
                                                <ul className="list-disc pl-6 mt-2 text-sm">
                                                    {phase.milestones.map((m, i) => (
                                                        <li key={i}>{m}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* PROJECTS */}
                        {roadmap.projects?.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold">🚀 Projects</h3>
                                <ul className="space-y-3 mt-2">
                                    {roadmap.projects.map((proj, i) => (
                                        <li key={i} className="p-3 border rounded-lg">
                                            <b>{proj.project_title}</b>

                                            {proj.description && (
                                                <p className="text-sm text-slate-600 mt-1">
                                                    {proj.description}
                                                </p>
                                            )}

                                            {proj.skills_covered?.length > 0 && (
                                                <p className="text-xs text-slate-500 mt-1">
                                                    Skills: {proj.skills_covered.join(", ")}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* ASSESSMENT */}
                        {roadmap.assessment && (
                            <div>
                                <h3 className="text-lg font-semibold">📝 Assessment</h3>

                                {roadmap.assessment.self_check_questions?.length > 0 && (
                                    <>
                                        <h4 className="font-medium mt-2">Self-Check Questions:</h4>
                                        <ul className="list-disc pl-6 mt-2 text-sm">
                                            {roadmap.assessment.self_check_questions.map((q, i) => (
                                                <li key={i}>{q}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {roadmap.assessment.evaluation_criteria?.length > 0 && (
                                    <>
                                        <h4 className="font-medium mt-4">Evaluation Criteria:</h4>
                                        <ul className="list-disc pl-6 mt-2 text-sm">
                                            {roadmap.assessment.evaluation_criteria.map((c, i) => (
                                                <li key={i}>{c}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}

                        {/* NEXT STEPS */}
                        {roadmap.next_steps && (
                            <div>
                                <h3 className="text-lg font-semibold">🌱 Next Steps</h3>

                                {roadmap.next_steps.career_paths?.length > 0 && (
                                    <>
                                        <h4 className="font-medium mt-2">Career Paths:</h4>
                                        <ul className="list-disc pl-6 mt-2 text-sm">
                                            {roadmap.next_steps.career_paths.map((c, i) => (
                                                <li key={i}>{c}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                {roadmap.next_steps.advanced_topics?.length > 0 && (
                                    <>
                                        <h4 className="font-medium mt-4">Advanced Topics:</h4>
                                        <ul className="list-disc pl-6 mt-2 text-sm">
                                            {roadmap.next_steps.advanced_topics.map((t, i) => (
                                                <li key={i}>{t}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        )}

                        {/* FALLBACK */}
                        {!roadmap.phases?.length &&
                            !roadmap.projects?.length &&
                            !roadmap.next_steps && (
                                <p className="text-slate-500 text-sm">
                                    No roadmap sections available yet.
                                </p>
                            )}
                    </div>
                </div>
            )}

        </div>
    );
}

export default VariableRoadmap;
