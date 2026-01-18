import { Button, Card, Form, Input, Typography, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                values
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);

            message.success("Login successful");

            if (res.data.user.role === "teacher") navigate("/teacher");
            else if (res.data.user.role === "student") navigate("/student");
            else navigate("/admin");
        } catch (err) {
            message.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ width: 350 }}>
                <Title level={3} style={{ textAlign: "center" }}>AI Exam Login</Title>

                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: "Please enter email" }]}
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

                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                    <Button type="link" block onClick={() => navigate("/signup")}>
                        New user? Create an account
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
