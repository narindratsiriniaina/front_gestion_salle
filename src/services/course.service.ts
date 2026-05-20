import api from "./api";
import { Course } from "@/types/course.types";

export const courseService = {
  getCourses: async (): Promise<Course[]> => {
    const response = await api.get<Course[]>("/Cours");
    return response.data;
  },

  getCourse: async (id: number): Promise<Course> => {
    const response = await api.get<Course>(`/Cours/${id}`);
    return response.data;
  },

  scheduleCourse: async (course: Omit<Course, "IdCours">): Promise<Course> => {
    const response = await api.post<Course>("/Cours/Planifier", course);
    return response.data;
  },

  validateCourse: async (id: number): Promise<Course> => {
    const response = await api.post<Course>(`/Cours/${id}/Valider`);
    return response.data;
  },

  cancelCourse: async (id: number): Promise<Course> => {
    const response = await api.post<Course>(`/Cours/${id}/Annuler`);
    return response.data;
  },
};
