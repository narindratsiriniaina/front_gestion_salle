import api from "./api";
import { Teacher } from "@/types/academic.types";
import { Course } from "@/types/course.types";

export const teacherService = {
  getTeachers: async (): Promise<Teacher[]> => {
    const response = await api.get<Teacher[]>("/Professeur");
    return response.data;
  },

  getTeacher: async (id: number): Promise<Teacher> => {
    const response = await api.get<Teacher>(`/Professeur/${id}`);
    return response.data;
  },

  createTeacher: async (teacher: Omit<Teacher, "IdProfesseur">): Promise<Teacher> => {
    const response = await api.post<Teacher>("/Professeur", teacher);
    return response.data;
  },

  updateTeacher: async (id: number, teacher: Teacher): Promise<void> => {
    await api.put(`/Professeur/${id}`, teacher);
  },

  deleteTeacher: async (id: number): Promise<Teacher> => {
    const response = await api.delete<Teacher>(`/Professeur/${id}`);
    return response.data;
  },

  getTeacherCourses: async (id: number): Promise<Course[]> => {
    const response = await api.get<Course[]>(`/Professeur/${id}/Cours`);
    return response.data;
  },
};
