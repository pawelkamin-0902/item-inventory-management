import axios from "axios";
import { API_CONFIG } from "../constants";

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

export type Item = {
  id: number;
  name: string;
  type: string;
  rarity: string | number;
  quantity: number;
};

// API functions with error handling
export const getItems = async (): Promise<Item[]> => {
  const { data } = await api.get<Item[]>("/items");
  return data;
};

export const addItem = async (itemData: Omit<Item, "id">): Promise<Item> => {
  const { data } = await api.post<Item>("/items", itemData);
  return data;
};

export const updateQuantity = async (id: number, quantity: number): Promise<Item> => {
  const { data } = await api.patch<Item>(`/items/${id}/quantity`, { quantity });
  return data;
};

export const removeItem = async (id: number): Promise<void> => {
  await api.delete(`/items/${id}`);
};
