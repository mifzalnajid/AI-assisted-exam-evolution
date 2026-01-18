import { Card, List, Typography, Tag } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Title, Text } = Typography;

const ExamResults = () => {
    const { examId } = useParams();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/submissions/exam/${examId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );
            setResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const totalScore = results.reduce((sum, r) => sum + (r.score || 0), 0);
    const totalMarks = results.reduce((sum, r) => sum + (r.questionId.maxMarks || 0), 0);

    return (
        <div>
            <Title level={3}>Exam Results</Title>
            <Title level={5}>Total Score: {totalScore}/{totalMarks}</Title>

            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={results}
                renderItem={(item) => (
                    <List.Item>
                        <Card>
                            <Title level={5}>{item.questionId.questionText}</Title>
                            <Text strong>Your Answer:</Text>
                            <p>{item.answer}</p>

                            <Tag color="blue">Score: {item.score}/{item.questionId.maxMarks}</Tag>
                            <br />

                            <Text strong>Feedback:</Text>
                            <p>{item.feedback}</p>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default ExamResults;
