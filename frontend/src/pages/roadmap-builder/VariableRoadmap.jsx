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
        <div>
            <h2 className="text-xl font-semibold mb-4">
                Create Roadmap Using Variables
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Target Role"
                />

                <input
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Your Current Experience"
                />

                {/* SKILLS */}
                <div>
                    <label className="font-medium">Skills</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {formData.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() => removeItem("skills", index)}
                                    className="text-red-500 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => addItem("skills")}
                        className="mt-2 text-blue-600 hover:underline"
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
                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                            >
                                {goal}
                                <button
                                    type="button"
                                    onClick={() => removeItem("goals", index)}
                                    className="text-red-500 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => addItem("goals")}
                        className="mt-2 text-green-600 hover:underline"
                    >
                        + Add Goal
                    </button>
                </div>

                <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Duration (months)"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Generate Roadmap
                </button>
            </form>
        </div>
    );
}

export default VariableRoadmap;
