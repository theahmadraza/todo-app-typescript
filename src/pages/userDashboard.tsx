import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchAllTask, deleteTaskById } from "../services/TaskServices";

interface Post {
  _id: string;
  name: string;
  description: string;
  image: string;
}
const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const deleteTask = async (id: string) => {
    try {
      let response = await deleteTaskById(id);
      console.log("Dashboard", response);
      if (response?.status === 200) {
        setPosts(posts.filter((task) => task._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchAllTask();
      setPosts(fetchedPost);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <Button onClick={() => navigate("/create-post")}>Add Post</Button>
        <Button>View List</Button>
      </div>
      <div className="todos">
        {posts.map((post, idx) => {
          return (
            <Cards
              id={post._id}
              name={post.name}
              description={post.description}
              image={post.image}
              deleteHandle={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;
