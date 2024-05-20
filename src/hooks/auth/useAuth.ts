import { useSelector } from "react-redux";
import {} from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";

export const useAuth = () => useSelector((state: AllState) => state.auth);
