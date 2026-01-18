import { Table, Button, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/exams`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setExams(res.data);
        } catch (err) {
            message.error("Failed to load exams");
        }
    };

    const columns = [
        { title: "Title", dataIndex: "title" },
        { title: "Subject", dataIndex: "subject" },
        { title: "Duration", dataIndex: "duration" },
        {
            title: "Action",
            render: (_, record) => (
                <Button type="link" onClick={() => navigate(`/student/exam/${record._id}`)}>
                    Start Exam
                </Button>
            ),
        },
    ];

    return <Table rowKey="_id" dataSource={exams} columns={columns} />;
};

export default StudentDashboard;
