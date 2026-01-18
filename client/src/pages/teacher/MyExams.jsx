import { Table, Button, message } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyExams = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/exams/my`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            setExams(res.data);
        } catch (err) {
            message.error("Failed to load exams");
        }
    };

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Subject",
            dataIndex: "subject",
        },
        {
            title: "Duration (min)",
            dataIndex: "duration",
        },
        {
            title: "Actions",
            render: (_, record) => (
                <Button
                    type="link"
                    onClick={() => navigate(`/teacher/exams/${record._id}`)}
                >
                    Add Questions
                </Button>
            ),
        },
    ];

    return <Table rowKey="_id" columns={columns} dataSource={exams} />;
};

export default MyExams;
