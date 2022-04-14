import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/api/home-settings`;

const getHomeSettings = async () => {
  const settings = await axios.get(`${baseUrl}`);
  return settings;
};

export default getHomeSettings;
