// hooks/useUserMutation.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserFormData } from "@/app/types";

const postUserData = async (userData: UserFormData) => {
  const response = await axios.post("/api/users", userData);
  return response.data;
};

export const useUserMutation = () => {
  return useMutation(postUserData:);
};
