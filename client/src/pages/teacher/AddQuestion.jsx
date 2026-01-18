import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const { TextArea } = Input;

const AddQuestion = () => {
    const { examId } = useParams();

    const onFinish = async (values) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/questions`,
                {
                    ...values,
                    examId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            message.success("Question added successfully");
        } catch (err) {
            message.error(err.response?.data?.message || "Failed to add question");
        }
    };

    return (
        <>
            <h2>Add Question</h2>

            <Form
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >
                <Form.Item
                    label="Question"
                    name="questionText"
                    rules={[{ required: true, message: "Please enter question" }]}
                >
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    label="Model Answer"
                    name="modelAnswer"
                    rules={[{ required: true, message: "Please enter model answer" }]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Maximum Marks"
                    name="maxMarks"
                    rules={[{ required: true, message: "Please enter marks" }]}
                >
                    <InputNumber min={1} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Add Question
                </Button>
            </Form>
        </>
    );
};

export default AddQuestion;
