import axios, { AxiosInstance } from "axios";

interface taskFormData {
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

const createTask = async (taskData: taskFormData) => {
  const addTask = createTaskServices();
  try {
    await addTask.post("/addtask", taskData);
    console.log("Task created successfully");
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

const deleteTaskById = async (id: string) => {
  try {
    const response = await createTaskServices().delete(`/deletetask/${id}`);
    return response;
  } catch (err) {
    console.log(err);
    throw new Error("Faild to delete Task");
  }
};

export { createTask, fetchAllTask, deleteTaskById };
