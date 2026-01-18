import { Button, Card, Form, Input, Select, Typography, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

const Signup = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, values);

            message.success("Registration successful. Please login.");
            navigate("/");
        } catch (err) {
            message.error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card style={{ width: 380 }}>
                <Title level={3} style={{ textAlign: "center" }}>
                    Sign Up
                </Title>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: "Please enter your name" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: "Please enter email" },
                            { type: "email", message: "Invalid email format" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Please enter password" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: "Please select role" }]}
                    >
                        <Select placeholder="Select role">
                            <Option value="teacher">Teacher</Option>
                            <Option value="student">Student</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>

                    <Button
                        type="link"
                        block
                        onClick={() => navigate("/")}
                    >
                        Already have an account? Login
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Signup;
