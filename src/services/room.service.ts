import api from "./api";
import { Room } from "@/types/room.types";

export const roomService = {
  getRooms: async (): Promise<Room[]> => {
    const response = await api.get<Room[]>("/Salle");
    return response.data;
  },

  getRoom: async (id: number): Promise<Room> => {
    const response = await api.get<Room>(`/Salle/${id}`);
    return response.data;
  },

  createRoom: async (room: Room): Promise<Room> => {
    const response = await api.post<Room>("/Salle", room);
    return response.data;
  },

  updateRoom: async (id: number, room: Room): Promise<void> => {
    await api.put(`/Salle/${id}`, room);
  },

  deleteRoom: async (id: number): Promise<Room> => {
    const response = await api.delete<Room>(`/Salle/${id}`);
    return response.data;
  },

  getAvailableRooms: async (): Promise<Room[]> => {
    const response = await api.get<Room[]>("/Salle/Disponibles");
    return response.data;
  },

  getRoomsByType: async (type: string): Promise<Room[]> => {
    const response = await api.get<Room[]>(`/Salle/ParType/${type}`);
    return response.data;
  },
};
