import { TPlatform } from "@/types/platform";
import axios from "axios";

export const platformApi = {
  createPlatform: async (payload: { name: string; slug: string }) => {
    const { data } = await axios.post("/api/platform", payload);
    return data;
  },
  getPlatformById: async (platformId: string) => {
    const { data } = await axios.get(`/api/platform/${platformId}`);
    return data;
  },
  updatePlatform: async (platformId: string, payload: Partial<TPlatform>) => {
    const { data } = await axios.put(`/api/platform/${platformId}`, payload);
    return data;
  },
  getAllPlatforms: async () => {
    const { data } = await axios.get("/api/platform");
    return data;
  },
  publishPlatform: async (platformId: string, isPublished: boolean) => {
    const { data } = await axios.patch(`/api/platform/${platformId}`, {
      isPublished,
    });
    return data;
  },
};
