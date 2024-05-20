import {useSelector} from "react-redux";
import {} from "@reduxjs/toolkit"
import { AllState } from "../../states/allState";

export const useCustomer = () => useSelector((state: AllState) => state.customer)
