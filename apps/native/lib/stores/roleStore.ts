import { create } from "zustand";
import { UserRole } from "../mockData";

interface RoleStore {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  reset: () => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  activeRole: "parent",
  setActiveRole: (role) => set({ activeRole: role }),
  reset: () => set({ activeRole: "parent" }),
}));
