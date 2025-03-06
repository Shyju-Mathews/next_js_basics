// store/useUserStore.ts
import {create} from "zustand";
import { UserFormData } from "@/app/types";
import { User } from "@/hooks/useUserForm";

interface UserStore {
  users: User[];
  addUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  addUser: (user) => {
    set((state) => {
      const updatedUsers = [...state.users, user];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    });
  },
}));
