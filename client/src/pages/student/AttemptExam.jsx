import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const { TextArea } = Input;
import { useNavigate } from "react-router-dom";


const AttemptExam = () => {
    const { examId } = useParams();
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/questions/exam/${examId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setQuestions(res.data);
        } catch (err) {
            message.error("Failed to load questions");
        }
    };

    const onFinish = async (values) => {
        try {
            const answers = Object.keys(values).map((questionId) => ({
                questionId,
                answer: values[questionId],
            }));

            await axios.post(
                `${import.meta.env.VITE_API_URL}/submissions`,
                {
                    examId,
                    answers,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            message.success("Exam submitted successfully!");
            navigate(`/student/results/${examId}`);
        } catch (err) {
            message.error("Submission failed");
        }
    };


    return (
        <Form layout="vertical" onFinish={onFinish}>
            {questions.map((q, index) => (
                <Form.Item
                    key={q._id}
                    label={q.questionText}
                    name={q._id}
                    rules={[{ required: true, message: "Answer required" }]}
                >
                    <TextArea rows={3} />
                </Form.Item>
            ))}

            <Button type="primary" htmlType="submit">
                Submit Exam
            </Button>
        </Form>
    );
};

export default AttemptExam;
