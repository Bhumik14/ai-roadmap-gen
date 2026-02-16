import { useState } from "react";
import { api } from "../../lib/api.js";

export default function InteractiveQuiz() {
  const [topic, setTopic] = useState("");
  const [purpose, setPurpose] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);

  const [loading, setLoading] = useState(false);

  // quiz data from API
  const [quizData, setQuizData] = useState(null);

  // interactive states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  // Handle Quiz Generation
  async function handleQuizGeneration(e) {
    e.preventDefault();

    if (!topic || !purpose || !numQuestions) {
      alert("All fields are required!");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/ai-services/create-quiz", {
        topic,
        purpose,
        num_questions: numQuestions,
      });
      // API response format:
      // res.data.quiz.quiz.questions
      setQuizData(res.data.quiz.quiz);

      // Reset interactive state
      setCurrentQuestion(0);
      setSelectedOption("");
      setShowAnswer(false);
    } catch (error) {
      console.log("Quiz generation error:", error);
      alert("Failed to generate quiz!");
    } finally {
      setLoading(false);
    }
  }

  // Handle Option Click
  function handleOptionSelect(option) {
    setSelectedOption(option);
    setShowAnswer(true);
  }

  // Next Question
  function handleNext() {
    setSelectedOption("");
    setShowAnswer(false);

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎯 Interactive Quiz Generator</h1>

      {/* FORM */}
      {!quizData && (
        <form style={styles.form} onSubmit={handleQuizGeneration}>
          <input
            type="text"
            placeholder="Enter Topic (e.g., Angular)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            style={styles.input}
          />

          <input
            type="text"
            placeholder="Enter Purpose (Interview Prep)"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            style={styles.input}
          />

          <input
            type="number"
            placeholder="Number of Questions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            style={styles.input}
          />

          <button style={styles.button} type="submit">
            {loading ? "Generating..." : "Generate Quiz 🚀"}
          </button>
        </form>
      )}

      {/* QUIZ UI */}
      {quizData && (
        <div style={styles.quizBox}>
          <h2>
            📌 Topic: {quizData.topic} | Purpose: {quizData.purpose}
          </h2>

          {/* Current Question */}
          <h3 style={styles.question}>
            Q{currentQuestion + 1}.{" "}
            {quizData.questions[currentQuestion].question}
          </h3>

          {/* Options */}
          <div style={styles.options}>
            {["A", "B", "C", "D"].map((key) => {
              const optionText =
                quizData.questions[currentQuestion][`option${key}`];

              return (
                <button
                  key={key}
                  style={{
                    ...styles.optionBtn,
                    backgroundColor:
                      selectedOption === key ? "#ffd54f" : "#f5f5f5",
                  }}
                  onClick={() => handleOptionSelect(key)}
                  disabled={showAnswer}
                >
                  {key}. {optionText}
                </button>
              );
            })}
          </div>

          {/* Answer Feedback */}
          {showAnswer && (
            <div style={styles.answerBox}>
              <p>
                ✅ Correct Answer:{" "}
                <b>{quizData.questions[currentQuestion].answer}</b>
              </p>

              <p style={{ marginTop: "10px" }}>
                📖 Explanation:{" "}
                {quizData.questions[currentQuestion].explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showAnswer && currentQuestion < quizData.questions.length - 1 && (
            <button style={styles.nextBtn} onClick={handleNext}>
              Next Question ➡️
            </button>
          )}

          {/* Finished */}
          {showAnswer && currentQuestion === quizData.questions.length - 1 && (
            <h2 style={{ marginTop: "20px" }}>🎉 Quiz Completed! Great job!</h2>
          )}

          {/* Restart */}
          <button style={styles.restartBtn} onClick={() => setQuizData(null)}>
            🔄 Generate Another Quiz
          </button>
        </div>
      )}
    </div>
  );
}

/* SIMPLE INLINE STYLES */
const styles = {
  container: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "400px",
    margin: "auto",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    background: "black",
    color: "white",
    cursor: "pointer",
    border: "none",
  },
  quizBox: {
    marginTop: "30px",
    padding: "20px",
    border: "2px solid #ddd",
    borderRadius: "10px",
  },
  question: {
    marginTop: "20px",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "15px",
  },
  optionBtn: {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "8px",
    border: "1px solid gray",
    fontSize: "15px",
  },
  answerBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#e8f5e9",
    borderRadius: "8px",
  },
  nextBtn: {
    marginTop: "15px",
    padding: "10px 15px",
    cursor: "pointer",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  restartBtn: {
    marginTop: "20px",
    padding: "10px 15px",
    cursor: "pointer",
    background: "darkred",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
};
