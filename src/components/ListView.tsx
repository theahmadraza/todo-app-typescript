import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { fetchAllTask } from "../services/TaskServices";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  description: string;
  date: string;
}

const ListView: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetchAllTask();
      setPosts(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const columns = [
    { title: "User ID", dataIndex: "user", key: "id" },
    { title: "Post ID", dataIndex: "_id", key: "id" },
    { title: "Title", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];
  return (
    <div className="list-view">
        <Button onClick={()=>navigate('/dashboard')}>Back</Button>
        <h3>Post Data</h3>
        <Table dataSource={posts} columns={columns} rowKey="id" />
    </div>
  );
};

export default ListView;
