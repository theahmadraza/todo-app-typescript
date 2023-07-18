import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { Button } from "antd";
import { fetchAllTask, deleteTaskById } from "../services/TaskServices";
import { useNavigate } from "react-router-dom";

interface Post {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const deletePost = async (id: string) => {
    try {
      let response = await deleteTaskById(id);
      if (response?.status === 200) {
        setPosts(posts.filter((task) => task._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editPost = (postId: string) => {
    const postToEdit = posts.find((post) => post._id === postId);
    if (postToEdit) {
      navigate(`/edit/${postToEdit._id}`);
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
        <Button onClick={() => navigate("/add-post")}>Add Post</Button>
        <Button onClick={() => navigate("/list-view")}>View List</Button>
      </div>
      {
        <div className="todos">
          {posts.map((post, idx) => {
            return (
              <div key={idx}>
                <Cards
                  id={post._id}
                  name={post.name}
                  description={post.description}
                  image={post.image}
                  deleteHandle={deletePost}
                  editHandle={editPost}
                />
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default UserDashboard;
