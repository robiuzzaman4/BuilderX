import axios from "axios";

export const userApi = {
  me: async () => {
    const { data } = await axios.get("/api/user/me");
    return data;
  },
};
