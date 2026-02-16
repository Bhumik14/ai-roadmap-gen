import { useState } from "react"

export default function InteractiveQuiz() {

    // Form State
    const [topic, setTopic] = useState("")
    const [numQuestions, setNumQuestions] = useState(5)
    const [purpose, setPurpose] = useState("")

    // Quiz State
    const [quizStarted, setQuizStarted] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const [userAnswer, setUserAnswer] = useState("")
    const [submittedAnswers, setSubmittedAnswers] = useState([])

    // Temporary Dummy Questions
    const questions = Array.from({ length: numQuestions }).map((_, i) => ({
        id: i + 1,
        question: `(${topic}) Question ${i + 1}: Explain a key concept about ${topic}.`,
    }))

    // Start Quiz
    const handleStartQuiz = (e) => {
        e.preventDefault()

        if (!topic || !purpose) return

        setQuizStarted(true)
        setCurrentIndex(0)
        setSubmittedAnswers([])
    }

    // Submit Answer → Next Question
    const handleSubmitAnswer = () => {
        if (!userAnswer.trim()) return

        // Save answer
        setSubmittedAnswers((prev) => [
            ...prev,
            {
                question: questions[currentIndex].question,
                answer: userAnswer,
            },
        ])

        // Clear input
        setUserAnswer("")

        // Move next
        setCurrentIndex((prev) => prev + 1)
    }

    // Finished Quiz
    const quizFinished = currentIndex >= questions.length

    return (
        <div className="space-y-6">

            {/* Page Title */}
            <div>
                <h2 className="text-xl font-semibold text-slate-900">
                    Interactive Quiz Builder 🤖
                </h2>
                <p className="text-sm text-slate-600">
                    Enter a topic and start answering questions in real-time.
                </p>
            </div>

            {/*QUIZ SETUP FORM*/}
            {!quizStarted && (
                <form
                    onSubmit={handleStartQuiz}
                    className="app-card"
                >
                    <div className="app-card-body space-y-4">

                        {/* Topic */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Topic
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. JavaScript Closures"
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Number */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Number of Questions
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={numQuestions}
                                onChange={(e) => setNumQuestions(Number(e.target.value))}
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Purpose */}
                        <div>
                            <label className="text-sm font-medium text-slate-700">
                                Purpose
                            </label>
                            <input
                                type="text"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="e.g. Interview Preparation"
                                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>

                        {/* Start Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                        >
                            Start Quiz
                        </button>
                    </div>
                </form>
            )}

            {/* QUIZ CARDS */}
            {quizStarted && !quizFinished && (
                <div className="app-card">
                    <div className="app-card-body space-y-4">

                        {/* Progress */}
                        <p className="text-sm text-slate-500">
                            Question {currentIndex + 1} of {questions.length}
                        </p>

                        {/* Question */}
                        <h3 className="text-lg font-semibold text-slate-900">
                            {questions[currentIndex].question}
                        </h3>

                        {/* Answer Input */}
                        <textarea
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            placeholder="Type your answer here..."
                            rows={4}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />

                        {/* Submit Button */}
                        <button
                            onClick={handleSubmitAnswer}
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                            Submit Answer →
                        </button>
                    </div>
                </div>
            )}

            {/*QUIZ COMPLETED*/}
            {quizFinished && (
                <div className="app-card">
                    <div className="app-card-body space-y-3">

                        <h3 className="text-lg font-semibold text-slate-900">
                            🎉 Quiz Completed!
                        </h3>

                        <p className="text-sm text-slate-600">
                            You answered all questions on <b>{topic}</b>.
                        </p>

                        {/* Answer Review */}
                        <div className="space-y-3">
                            {submittedAnswers.map((item, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-slate-200 p-3"
                                >
                                    <p className="text-sm font-medium text-slate-800">
                                        Q{i + 1}: {item.question}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Answer: {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Restart */}
                        <button
                            onClick={() => setQuizStarted(false)}
                            className="mt-3 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                        >
                            Restart Quiz
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
