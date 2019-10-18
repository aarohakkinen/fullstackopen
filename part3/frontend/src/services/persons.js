import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const fetch = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const add = nameObject => {
  const request = axios.post(baseUrl, nameObject);
  return request.then(response => response.data);
};

const remove = nameObject => {
  const request = axios.delete(`${baseUrl}/${nameObject.id}`);
  return request.then(response => response.data);
};

const update = nameObject => {
  const request = axios.put(`${baseUrl}/${nameObject.id}`, nameObject);
  return request.then(response => response.data);
};

export default { fetch, add, remove, update };
