import axios, { AxiosInstance } from "axios";

interface Posts {
  name: string;
  description: string;
  image: string;
}

const createTaskServices = (): AxiosInstance => {
  const authToken = localStorage.getItem("token");
  return axios.create({
    baseURL: "http://localhost:5000/api/task",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  });
};

const createTask = async (post: Posts) => {
  const addTask = createTaskServices();
  try {
    let response = await addTask.post("/addtask", post);
    console.log("Task created successfully");
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to Create Task`);
  }
};

const fetchAllTask = async () => {
  const getAllTasks = createTaskServices();
  try {
    let response = await getAllTasks.get("/fetchalltask");
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch tasks");
  }
};

const fetchTaskById = async (id: string): Promise<Posts | undefined> => {
  try {
    const getTask = createTaskServices();
    const response = await getTask.get(`/fetchtask/${id}`);
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error("Faild to Fetch");
  }
};

const updateTask = async (id: string, post: Posts) => {
  try {
    const response = await createTaskServices().put(`/updatetask/${id}`, post);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Faild to Update Task");
  }
};

const deleteTaskById = async (id: string) => {
  try {
    const response = await createTaskServices().delete(`/deletetask/${id}`);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Faild to delete Task");
  }
};

export { createTask, fetchAllTask, deleteTaskById, updateTask, fetchTaskById };
