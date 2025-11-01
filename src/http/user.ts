import { SignUpFormValues } from "@/components/forms/sign-up-form";
import axios from "axios";

export const userApi = {
  signUp: async (payload: SignUpFormValues) => {
    const { data } = await axios.post("/api/auth/sign-up", payload);
    return data;
  },
};
