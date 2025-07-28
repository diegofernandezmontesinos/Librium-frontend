/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_URL = 'http://localhost:5173'; 

export const signUp = async (user: any) => {
  const response = await axios.post(`${API_URL}/signup`, user);
  return response.data;
};

export const signIn = async (credentials: any) => {
  const response = await axios.post(`${API_URL}/signin`, credentials);
  return response.data;
};

export const signOut = async () => {
  const response = await axios.post(`${API_URL}/signout`);
  return response.data;
};