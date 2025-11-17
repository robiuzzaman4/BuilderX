"use client";

import { useAuth } from "@/provider/auth-provider";

const UsersPage = () => {
  const { user } = useAuth();
  console.log("loggedin user: ", user);
  return <div>UsersPage</div>;
};

export default UsersPage;
