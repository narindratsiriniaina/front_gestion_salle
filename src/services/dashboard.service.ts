import api from "./api";
import { DashboardStats } from "@/types/dashboard.types";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get<DashboardStats>("/Dashboard/Stats");
    return response.data;
  },
};
