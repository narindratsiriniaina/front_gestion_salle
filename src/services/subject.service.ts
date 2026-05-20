import api from "./api";
import { Subject } from "@/types/academic.types";

export const subjectService = {
  getSubjects: async (): Promise<Subject[]> => {
    const response = await api.get<Subject[]>("/Matiere");
    return response.data;
  },

  getSubject: async (id: number): Promise<Subject> => {
    const response = await api.get<Subject>(`/Matiere/${id}`);
    return response.data;
  },

  createSubject: async (subject: Subject): Promise<Subject> => {
    const response = await api.post<Subject>("/Matiere", subject);
    return response.data;
  },

  updateSubject: async (id: number, subject: Subject): Promise<void> => {
    await api.put(`/Matiere/${id}`, subject);
  },

  deleteSubject: async (id: number): Promise<Subject> => {
    const response = await api.delete<Subject>(`/Matiere/${id}`);
    return response.data;
  },
};
