import { useState } from "react";
import { api } from "../../lib/api.js";

export default function InteractiveQuiz() {
  // Form State
  const [topic, setTopic] = useState("");
  const [purpose, setPurpose] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  
  // Quiz UI State
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Question State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [summary, setSummary] = useState([]); // Store correct/incorrect answers

  // Answer State
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Loading State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Handle Quiz Generation
  const handleStartQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccess(false);

    if (!topic || !purpose || !numQuestions) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/ai-services/create-quiz", {
        topic,
        purpose,
        num_questions: numQuestions,
      });
      
      // API response format: res.data.quiz.quiz.questions
      if (res.data && res.data.quiz && res.data.quiz.quiz && res.data.quiz.quiz.questions) {
        setAllQuestions(res.data.quiz.quiz.questions);
        setCurrentQuestion(res.data.quiz.quiz.questions[0]);
        setQuizStarted(true);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      } else {
        setError("Failed to generate quiz!");
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      setError("Failed to generate quiz!");
    } finally {
      setLoading(false);
    }
  };

  // Handle Option Click
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setUserAnswer(option);
  };

  // Handle Answer Submission
  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      setError("Please select an answer!");
      return;
    }

    // Evaluate answer
    const correctAnswer = currentQuestion.answer;
    const userAnsweredCorrectly = selectedOption === correctAnswer;
    
    // Add to summary
    setSummary((prevSummary) => [...prevSummary, userAnsweredCorrectly]);
    setShowAnswer(true);

    // Show feedback
    if (userAnsweredCorrectly) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);
    }
  };

  // Handle Next Question
  const handleNextQuestion = () => {
    setUserAnswer("");
    setSelectedOption("");
    setShowAnswer(false);

    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentQuestion(allQuestions[currentIndex + 1]);
    } else {
      setQuizFinished(true);
      setQuizStarted(false);
    }
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    setTopic("");
    setPurpose("");
    setNumQuestions(5);
    setSummary([]);
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentIndex(0);
    setCurrentQuestion(null);
    setAllQuestions([]);
    setUserAnswer("");
    setSelectedOption("");
    setError(null);
    setShowAnswer(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Beautiful Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
          <span className="text-3xl">🤖</span>
        </div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
          AI Quiz Buddy
        </h1>
        <p className="text-gray-600">
          Learn with fun! Answer questions that adapt to your level 🎯
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="animate-bounce bg-green-100 border-2 border-green-300 rounded-xl p-4 text-center shadow-md">
          <p className="text-green-700 font-bold text-lg">🎉 Great job! Keep going!</p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 shadow-md">
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Quiz Setup Form */}
      {!quizStarted && !quizFinished && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🚀 Start Your Learning Journey
          </h2>
          <form onSubmit={handleStartQuiz} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                📚 Topic
              </label>
              <input
                type="text"
                placeholder="e.g., React Hooks, Python Basics, Math Algebra"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-700"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                🎯 Purpose
              </label>
              <input
                type="text"
                placeholder="e.g., Exam Prep, Interview Practice, Fun Learning"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-700"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                📊 Number of Questions
              </label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-700"
                disabled={loading}
              >
                <option value={3}>3 Questions - Quick Quiz</option>
                <option value={5}>5 Questions - Standard Quiz</option>
                <option value={10}>10 Questions - Deep Dive</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⚡</span>
                  Generating Quiz...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  🚀 Start Quiz
                </span>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Quiz Question UI */}
      {quizStarted && !quizFinished && currentQuestion && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Question {currentIndex + 1} of {allQuestions.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round(((currentIndex + 1) / allQuestions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / allQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              📝 Question {currentIndex + 1}
            </h3>
            <p className="text-lg text-gray-700">
              {currentQuestion.question || "Loading question..."}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {["A", "B", "C", "D"].map((key) => {
              const optionText = currentQuestion[`option${key}`];
              if (!optionText) return null;

              const isSelected = selectedOption === key;
              const isCorrect = showAnswer && key === currentQuestion.answer;
              const isWrong = showAnswer && isSelected && key !== currentQuestion.answer;

              return (
                <button
                  key={key}
                  onClick={() => !showAnswer && handleOptionSelect(key)}
                  disabled={showAnswer}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 font-medium ${
                    showAnswer
                      ? isCorrect
                        ? 'bg-green-100 border-green-500 text-green-800'
                        : isWrong
                        ? 'bg-red-100 border-red-500 text-red-800'
                        : 'bg-gray-50 border-gray-200 text-gray-500'
                      : isSelected
                      ? 'bg-blue-100 border-blue-500 text-blue-800'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700'
                  }`}
                >
                  <span className="font-bold mr-3">{key}.</span>
                  {optionText}
                  {showAnswer && isCorrect && <span className="float-right">✅</span>}
                  {showAnswer && isWrong && <span className="float-right">❌</span>}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback */}
          {showAnswer && (
            <div className={`rounded-xl p-4 mb-6 ${
              selectedOption === currentQuestion.answer
                ? 'bg-green-100 border-2 border-green-300'
                : 'bg-red-100 border-2 border-red-300'
            }`}>
              <p className="font-bold text-lg mb-2">
                {selectedOption === currentQuestion.answer ? '✅ Correct!' : '❌ Incorrect!'}
              </p>
              <p className="text-sm">
                The correct answer is <strong>{currentQuestion.answer}</strong>
              </p>
              {currentQuestion.explanation && (
                <p className="text-sm mt-2">
                  📖 {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!showAnswer ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption || loading}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2">⚡</span>
                    Checking...
                  </span>
                ) : (
                  'Submit Answer ✅'
                )}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
              >
                Next Question ➡️
              </button>
            )}
          </div>
        </div>
      )}

      {/* Quiz Finished UI */}
      {quizFinished && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4">
              <span className="text-3xl">🏆</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              🎉 Quiz Completed!
            </h2>
            <p className="text-gray-600">
              Great job completing {allQuestions.length} questions on <strong>{topic}</strong>!
            </p>
            
            {/* Score Summary */}
            <div className="mt-6 inline-flex items-center space-x-6 bg-gray-50 rounded-xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {summary.filter(item => item).length}
                </div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div className="text-2xl text-gray-400">vs</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {summary.filter(item => !item).length}
                </div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
            </div>
          </div>

          {/* Answers Summary */}
          <div className="border-t pt-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">📊 Your Performance:</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {allQuestions.map((question, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-gray-700 flex-1">
                      Q{index + 1}: {question.question}
                    </p>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      summary[index] 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {summary[index] ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Correct answer: <span className="font-medium text-green-600">{question.answer}</span></p>
                    {question.explanation && (
                      <p className="mt-1">📖 {question.explanation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Restart Button */}
          <button
            onClick={handleRestartQuiz}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg text-lg"
          >
            🔄 Try Another Quiz
          </button>
        </div>
      )}
    </div>
  );
}
