import axios, { AxiosInstance } from "axios";

interface createUser {
  name: string;
  email: string;
  password: string;
}

interface loginUser {
  email: string;
  password: string;
}

const createAuthServices = (): AxiosInstance => {
  return axios.create({
    baseURL: "http://localhost:5000/api/auth",
  });
};

const signUp = async (user: createUser): Promise<any> => {
  try {
    const authServices = createAuthServices();
    const response = await authServices.post("/createuser", user);
    return response;
  } catch (err) {
    return err
  }
};

const login = async (user: loginUser): Promise<any> => {
  try {
    const authServices = createAuthServices();
    const response = await authServices.post("login", user);
    localStorage.setItem("token", response.data.authtoken);
    // console.log("Successfully Login");
    return response;
  } catch (err) {
    return err;
  }
};

export { signUp, login };

