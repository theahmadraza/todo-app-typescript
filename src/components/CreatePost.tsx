import React, {useState, ChangeEvent} from 'react';
import { Button, Form, Input } from 'antd';
import { createTask } from '../services/TaskServices';
import { useNavigate } from 'react-router-dom';

interface Posts{
    name:string;
    description:string;
    image:string;
}

const CreatePost:React.FC = () => {
    const [post, setPost] = useState<Posts>({
        name: '',
        description:'',
        image:'',
    })

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        const {name, value} = e.target;
        setPost((prevData)=>({
          ...prevData,
          [name]:value,
        }))
        if (imageFile){
          const reader = new FileReader();
          reader.onloadend = () => {
            setPost((prevData)=>({
              ...prevData,
              ["image"]:reader.result as string,
            }))
          }
          reader.readAsDataURL(imageFile);
        };
    }

    const handleSubmitPost = async (e: React.FormEvent<HTMLFormElement>) =>{
      console.log(post);
      await createTask(post);
        setPost({
            name:"",
            description:"",
            image:'',
        })
        navigate("/dashboard")
    }
    return (
        <div className='main-form'>
            <Form
            name="basic"
            layout="vertical"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={handleSubmitPost}
            >
            <Form.Item className='form-field'
            label="Title"
            name="name"
            rules={[{required:true, message:'Title is Requried'}]}
            >
            <Input name='name' value={post.name} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item className='form-field'
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Description is Required' }]}
            >
            <Input name='description' value={post.description} onChange={handleInputChange} />
            </Form.Item>
            <Form.Item className='form-field'
            label="Select Image"
            name="image"
            >
            <Input name='image' type="file" accept="image/*" onChange={handleInputChange}/>
            </Form.Item>
            {post.image && <img src={post.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '50px' }} />}
            <Form.Item>
            <Button type="primary" htmlType="submit">Publish</Button>
            </Form.Item>
        </Form>
        </div>
    );
};

export default CreatePost;