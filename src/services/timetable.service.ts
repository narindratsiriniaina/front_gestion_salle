import api from "./api";
import { Course, TimetableFilters } from "@/types/course.types";

export const timetableService = {
  getWeeklyTimetable: async (filters: TimetableFilters = {}): Promise<Course[]> => {
    const response = await api.get<Course[]>("/EDT/Hebdomadaire", { params: filters });
    return response.data;
  },

  getTimetableByRoom: async (id: number): Promise<Course[]> => {
    const response = await api.get<Course[]>(`/EDT/ParSalle/${id}`);
    return response.data;
  },

  getTimetableByClass: async (id: number): Promise<Course[]> => {
    const response = await api.get<Course[]>(`/EDT/ParClasse/${id}`);
    return response.data;
  },

  getTimetableByTeacher: async (id: number): Promise<Course[]> => {
    const response = await api.get<Course[]>(`/EDT/ParProfesseur/${id}`);
    return response.data;
  },
};
