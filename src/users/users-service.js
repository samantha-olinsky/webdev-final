import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const USERS_URL = 'http://localhost:4000/api/users';


const api = axios.create({ withCredentials: true });


export const login = async ({ username, password }) => {
  const response = await api.post(`${USERS_URL}/login`, {
    username,
    password,
  });
  const user = response.data;
  return user;
};

export const logout = async () => {
  const response = await api.post(`${USERS_URL}/logout`);
  return response.data;
};


export const profile = async () => {
  const response = await api.post(`${USERS_URL}/profile`);
  return response.data;
};


export const updateUser = async (user) => {
  const response = await api.put(`${USERS_URL}/${user._id}`, user);
  return response.data;
};


export const register = async (newUser) => { const response = await api.post(`${USERS_URL}/register`,
  newUser
);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get(USERS_URL);
  return response.data;
}

export const createUser = async (user) => {
  const response = await api.post(USERS_URL, user)
  return response.data;
}

export const findUserById = async (uid) => {
  const response = await api.get(`${USERS_URL}/${uid}`);
  return response.data;
}

export const deleteUser = async (uid) => {
  const response = await api.delete(`${USERS_URL}/${uid}`)
  return response.data
}

export const findUserByUsername = async (username) => {
  const response = await axios.get(`${USERS_URL}/username/${username}`);
  return response.data;
}

export const incrementUserLikes = async (uid) => {
  const response = await api.put(`${USERS_URL}/${uid}/likes`);
  return response.data;
}

export const incrementUserComments = async (uid) => {
  const response = await axios.put(`${USERS_URL}/${uid}/comments`);
  return response.data;
}

export const incrementUserActionsTaken = async (uid) => {
  const response = await axios.put(`${USERS_URL}/${uid}/actionsTaken`);
  return response.data;
}
