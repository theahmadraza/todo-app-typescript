import React, { useState, useEffect, ChangeEvent } from "react";
import { Button, Form, Input } from "antd";
import {
  createTask,
  updateTask,
  fetchTaskById,
} from "../services/TaskServices";
import { useNavigate, useParams } from "react-router-dom";

export interface Post {
  image: string;
}

const CreatePost: React.FC = () => {
  const [file, setFile] = useState<Post>({ image: "" });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    const { name, value } = e.target;
    setFile({
      ...file,
      [name]: value,
    });
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile((prevData) => ({
          ...prevData,
          ["image"]: reader.result as string,
        }));
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmitPost = async (values: any) => {
    const dataToSend = {
      ...values,
      image: file.image,
    };
    if (id) {
      let response = await updateTask(id, dataToSend);
      if (response.status === 200) {
        alert("Updated successfully!");
        navigate("/dashboard");
      }
    } else {
      let response = await createTask(dataToSend);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const response = await fetchTaskById(id);
        if (response) {
          form.setFieldValue("name", response.name);
          form.setFieldValue("description", response.description);
          form.setFieldValue("image", null);
        }
      }
    };
    fetchPost();
  }, [id, form]);

  return (
    <div className="main-form">
      <Form
        form={form}
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        // autoComplete="off"
        onFinish={handleSubmitPost}
      >
        <Form.Item
          className="form-field"
          label="Title"
          name="name"
          rules={[{ required: true, message: "Title is Requried" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="form-field"
          label="Description"
          name="description"
          rules={[{ required: true, message: "Description is Required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="form-field" label="Select Image" name="image">
          <Input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleInputChange}
          />
        </Form.Item>
        {file.image && (
          <img
            src={file.image}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "50px" }}
          />
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {id ? "Update Post" : "Add Post"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePost;
