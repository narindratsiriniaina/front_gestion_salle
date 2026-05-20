import api from "./api";
import { User } from "@/types/user.types";

export interface LoginResponse {
  IdUtilisateur: number;
  Email: string;
  Role: 'admin' | 'demandeur' | 'validateur';
}

export const authService = {
  login: async (email: string, password = ""): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/Utilisateur/Login", {
      Email: email,
      Password: password,
    });
    return response.data;
  },

  register: async (user: Omit<User, "IdUtilisateur">): Promise<User> => {
    const response = await api.post<User>("/Utilisateur/Register", user);
    return response.data;
  },

  getUsers: async (): Promise<User[]> => {
    const response = await api.get<User[]>("/Utilisateur");
    return response.data;
  },
};
