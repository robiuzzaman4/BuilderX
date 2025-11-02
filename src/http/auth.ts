import { SignInFormValues } from "@/components/forms/sign-in-form";
import { SignUpFormValues } from "@/components/forms/sign-up-form";
import axios from "axios";

export const authApi = {
  signUp: async (payload: SignUpFormValues) => {
    const { data } = await axios.post("/api/auth/sign-up", payload);
    return data;
  },

  signIn: async (payload: SignInFormValues) => {
    const { data } = await axios.post("/api/auth/sign-in", payload);
    return data;
  },

  signOut: async () => {
    const { data } = await axios.post("/api/auth/sign-out");
    return data;
  },
};
