import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { Button } from "antd";
import {
  fetchAllTask,
  deleteTaskById,
  createTask,
  updateTask,
} from "../services/TaskServices";
import CreatePost, { Posts } from "../components/CreatePost";
import { useNavigate } from "react-router-dom";

interface Post {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const UserDashboard: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [addPostId, setAddPostId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<Boolean>(false);

  const navigate = useNavigate();

  const addPost = async (data: Posts) => {
    try {
      let response = await createTask(data);
      setAddPostId(response.task._id);
      setShowForm(!showForm);
    } catch (err) {
      console.log("Task not Created", err);
    }
  };

  const updatePost = async (data: Posts) => {
    if (editPostId) {
      try {
        const response = await updateTask(editPostId, data);
        const updatedPost: Post = response.data;
        const updatedPosts = posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        );
        setPosts(updatedPosts);
        setIsEdit(false);
        setAddPostId(editPostId);
        setEditPostId("");
        setShowForm(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteTask = async (id: string) => {
    try {
      let response = await deleteTaskById(id);
      if (response?.status === 200) {
        setPosts(posts.filter((task) => task._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const editTask = (postId: string) => {
    const postToEdit = posts.find((post) => post._id === postId);
    if (postToEdit) {
      setIsEdit(true);
      setEditPostId(postId);
      setShowForm(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchAllTask();
      setPosts(fetchedPost);
    };
    fetchData();
  }, [addPostId]);

  return (
    <div className="dashboard">
      <div className="dashboard-nav">
        <Button onClick={() => setShowForm(!showForm)}>Add Post</Button>
        <Button onClick={() => navigate("/list-view")}>View List</Button>
      </div>
      <div>
        {(showForm) && (
          <CreatePost
            onSubmit={isEdit ? updatePost : addPost}
            btnType={isEdit ? "Update" : "Add"}
          />
        )}
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
                  deleteHandle={deleteTask}
                  editHandle={editTask}
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
