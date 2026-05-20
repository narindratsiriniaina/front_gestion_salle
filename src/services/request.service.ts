import api from "./api";
import { TimetableRequest } from "@/types/request.types";

export const requestService = {
  getRequests: async (): Promise<TimetableRequest[]> => {
    const response = await api.get<TimetableRequest[]>("/DemandeEDT");
    return response.data;
  },

  createRequest: async (request: Omit<TimetableRequest, "IdDemande">): Promise<TimetableRequest> => {
    const response = await api.post<TimetableRequest>("/DemandeEDT/Creer", request);
    return response.data;
  },

  validateRequest: async (id: number): Promise<TimetableRequest> => {
    const response = await api.post<TimetableRequest>(`/DemandeEDT/${id}/Valider`);
    return response.data;
  },
};
