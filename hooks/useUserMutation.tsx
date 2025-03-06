// hooks/useUserMutation.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserFormData } from "@/app/types";
import { User, useUserForm } from "./useUserForm";
import { useUserStore } from "@/state/userStore";

const postUserData = async (userData: User) => {
  const response = await axios.post("/api/users", userData);
  return response.data;
};

// export const useUserMutation = () => {
//   return useMutation(postUserData);
// };


export const useUserMutation = () => {

  const { addUser } = useUserStore();
  const { reset } = useUserForm();

  return useMutation({
    mutationFn:  postUserData,  // Function to run the mutation
    onSuccess: (data) => {
      console.log("User created successfully:", data);
      addUser(data); // Store to Zustand
      reset();
      // Here, you can update your UI or redirect after a successful request
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      // Handle the error, show an error message, etc.
    },
    onSettled: () => {
      // This will run after the mutation finishes, regardless of success or failure
      console.log("Mutation finished (success or failure).");
      // You can use this to reset forms, refetch data, or do any clean-up
    }
  });
};
