import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes";

// const getAll = async () => {
//   const result = await axios.get(baseUrl);
//   return result.data;
// };

const getAll = () => {
  // return axios.get(baseUrl).then((response) => response.data);
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = async (newObject) => {
  const request = await axios.post(baseUrl, newObject);
  return request.data;
};

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject);
  return request.data;
};

export default {
  getAll,
  create,
  update,
};
