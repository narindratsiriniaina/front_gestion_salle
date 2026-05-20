import api from "./api";
import { ClassGroup } from "@/types/academic.types";
import { Course } from "@/types/course.types";

export const classService = {
  getClasses: async (): Promise<ClassGroup[]> => {
    const response = await api.get<ClassGroup[]>("/Classe");
    return response.data;
  },

  getClass: async (id: number): Promise<ClassGroup> => {
    const response = await api.get<ClassGroup>(`/Classe/${id}`);
    return response.data;
  },

  createClass: async (classGroup: Omit<ClassGroup, "IdClasse">): Promise<ClassGroup> => {
    const response = await api.post<ClassGroup>("/Classe", classGroup);
    return response.data;
  },

  updateClass: async (id: number, classGroup: ClassGroup): Promise<void> => {
    await api.put(`/Classe/${id}`, classGroup);
  },

  deleteClass: async (id: number): Promise<ClassGroup> => {
    const response = await api.delete<ClassGroup>(`/Classe/${id}`);
    return response.data;
  },

  getClassTimetable: async (id: number): Promise<Course[]> => {
    const response = await api.get<Course[]>(`/Classe/${id}/EmploiDuTemps`);
    return response.data;
  },
};
