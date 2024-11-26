import { createContext } from "react";

export interface Profile {
  name: string;
  phone: string;
  address: string;
  country: string;
  province: string;
  city: string;
  postalCode: string;
}

export interface ProfileContextType {
  fetchAddress: () => void;
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void;
  country: string;
  setCountry: (country: string) => void;
  province: string;
  setProvince: (province: string) => void;
  city: string;
  setCity: (city: string) => void;
  postalCode: string;
  setPostalCode: (postalCode: string) => void;
  pickName: string;
  setPickName: (pickName: string) => void;
  pickEmail: string;
  setPickEmail: (pickEmail: string) => void;
  pickPhone: string;
  setPickPhone: (pickPhone: string) => void;
  saveAddress: boolean;
  updateMessage: string;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);
