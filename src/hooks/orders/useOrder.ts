import { useSelector } from "react-redux";
import {} from "@reduxjs/toolkit";
import { AllState } from "../../states/allState";

export const useOrder = () => useSelector((state: AllState) => state.order);
