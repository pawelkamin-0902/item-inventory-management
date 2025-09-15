import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // backend Laravel API
});

export type Item = {
  id: number;
  name: string;
  type: string;
  rarity: string | number; // backend can return label string or enum number (0-4)
  quantity: number;
};

export async function getItems(): Promise<Item[]> {
  const res = await api.get<Item[]>("/items");
  return res.data;
}

export async function addItem(data: Omit<Item, "id">): Promise<Item> {
  const res = await api.post<Item>("/items", data);
  return res.data;
}

export async function updateQuantity(id: number, quantity: number): Promise<Item> {
  const res = await api.patch<Item>(`/items/${id}/quantity`, { quantity });
  return res.data;
}

export async function removeItem(id: number): Promise<void> {
  await api.delete(`/items/${id}`);
}
