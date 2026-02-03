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

        const response = await api.post("/ai-services/create-roadmap", {
            target_role: formData.role,
            experience: formData.experience,
            skills: formData.skills,
            goals: formData.goals,
            duration: formData.duration
        });

        console.log(response);
    }

    return (
        <div className="max-w-3xl">
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
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Target Role</label>
                                <input
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="app-input"
                                    placeholder="e.g., Frontend Engineer"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Current Experience</label>
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
                                    className="text-slate-500 hover:text-red-600"
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
                                    className="text-slate-500 hover:text-red-600"
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Duration</label>
                                <input
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    className="app-input"
                                    placeholder="e.g., 3 months"
                                />
                            </div>
                            <div className="hidden sm:block" />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="app-button"
                            >
                                Generate Roadmap
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default VariableRoadmap;
