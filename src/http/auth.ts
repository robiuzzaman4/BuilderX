import { SignInFormValues } from "@/components/forms/sign-in-form";
import axios from "axios";

export const authApi = {
  signIn: async (payload: SignInFormValues) => {
    const { data } = await axios.post("/api/auth/sign-in", payload);
    return data;
  },

  me: async () => {
    const { data } = await axios.get("/api/auth/me");
    return data;
  },

  signOut: async () => {
    const { data } = await axios.post("/api/auth/sign-out");
    return data;
  },
};
