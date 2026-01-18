const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

exports.evaluateAnswer = async ({ question, modelAnswer, studentAnswer, maxMarks }) => {
    // build prompt
    const prompt = `
You are an exam evaluator.
Your task is to compare the Student Answer with the Model Answer and assign a score out of ${maxMarks}.
Return JSON only, with:
{
  "score": number,
  "feedback": "constructive feedback"
}
Rules:
- Understand meaning, not grammar
- Give partial marks
- Keep feedback concise
Question: ${question}
Model Answer: ${modelAnswer}
Student Answer: ${studentAnswer}
  `.trim();

    try {
        const response = await axios.post(
            OPENROUTER_API_URL,
            {
                model: "gpt-4o-mini",    // good mix of quality & cost
                messages: [{ role: "user", content: prompt }],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const text = response.data.choices?.[0]?.message?.content;
        return JSON.parse(text);

    } catch (error) {
        console.error("AI evaluation error:", error.response?.data || error.message);
        throw new Error("AI Evaluation failed");
    }
};
