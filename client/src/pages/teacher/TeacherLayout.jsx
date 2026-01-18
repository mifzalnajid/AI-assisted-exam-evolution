import { Layout, Menu, Button } from "antd";
import {
    DashboardOutlined,
    FileAddOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const TeacherLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <Sider breakpoint="lg" theme="dark">

                <div
                    style={{
                        height: 64,
                        color: "white",
                        fontSize: 18,
                        textAlign: "center",
                        lineHeight: "64px",
                        fontWeight: "bold",
                    }}
                >
                    AI-EXAM
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["dashboard"]}
                    onClick={({ key }) => navigate(`/teacher/${key}`)}
                    items={[
                        { key: "dashboard", label: "Dashboard" },
                        { key: "create-exam", label: "Create Exam" },
                        { key: "exams", label: "My Exams" },
                    ]}

                />
            </Sider>

            {/* Main Area */}
            <Layout>
                <Header
                    style={{
                        background: "#fff",
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingRight: 20,
                        paddingTop: 5,
                    }}
                >
                    <Button
                        icon={<LogoutOutlined />}
                        danger
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Header>

                <Content style={{ margin: 16 }}>
                    <div
                        style={{
                            padding: 24,
                            background: "#fff",
                            minHeight: 360,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default TeacherLayout;
