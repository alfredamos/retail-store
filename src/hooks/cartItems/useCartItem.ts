import {useSelector} from "react-redux";
import {} from "@reduxjs/toolkit"
import { AllState } from "../../states/allState";

export const useCart = () => useSelector((state: AllState) => state.cart)
