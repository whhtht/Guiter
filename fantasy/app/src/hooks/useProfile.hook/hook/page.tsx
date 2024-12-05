import { useContext } from "react";
import { ProfileContext, ProfileContextType } from "../context/page";

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
