import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";

const CreateExam = () => {
    const onFinish = async (values) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/exams`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            message.success("Exam created successfully");
        } catch (err) {
            message.error(err.response?.data?.message || "Failed to create exam");
        }
    };

    return (
        <>
            <h2>Create Exam</h2>

            <Form
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 400 }}
            >
                <Form.Item
                    label="Exam Title"
                    name="title"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Duration (minutes)"
                    name="duration"
                    rules={[{ required: true }]}
                >
                    <InputNumber min={1} style={{ width: "100%" }} />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Create Exam
                </Button>
            </Form>
        </>
    );
};

export default CreateExam;
