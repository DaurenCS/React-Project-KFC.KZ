import axios from "axios"

const local = "http://127.0.0.1:8000"
const renderhost = "https://online-food-react-backend.onrender.com"

export default axios.create({
    baseURL: `${renderhost}/api/v1`,
  });