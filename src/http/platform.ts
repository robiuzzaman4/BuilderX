import { TPlatform } from "@/types/platform";
import axios from "axios";

export const platformApi = {
  createPlatform: async (payload: Partial<TPlatform>) => {
    const { data } = await axios.post("/api/platform", payload);
    return data;
  },
};
