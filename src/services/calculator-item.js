import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_API_URL;

const getCalculatorItems = async (item) => {
  const settings = await axios.get(`${apiUrl}/api/${item}s`);
  return settings;
};

export default getCalculatorItems;
