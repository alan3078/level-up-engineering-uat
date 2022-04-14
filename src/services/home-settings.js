import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_API_URL;
const baseUrl = `${apiUrl}/api/home-settings`;

const getHomeSettings = async () => {
  const settings = await axios.get(`${baseUrl}`);
  return settings;
};

export default getHomeSettings;
