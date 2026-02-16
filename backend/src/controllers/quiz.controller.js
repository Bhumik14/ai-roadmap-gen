import { fastapiClient } from "../config/fastapi.js";

export async function quizCreationController(req, res) {
  try {

    if (!req.body?.topic) {
      return res.status(400).json({
        error: "Topic is required",
      });
    }

    const body = {
      topic: req.body.topic,
      purpose: req.body.purpose || "Learning",
      previous_q_summary: req.body.previous_q_summary || [],
    };

    const response = await fastapiClient.post("/roadmap/create-quiz", body);

    return res.status(201).json({
      message: "Quiz question created successfully",
      question: response.data,
    });
  } catch (err) {
    console.error("Error in Quiz Creation:", err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
