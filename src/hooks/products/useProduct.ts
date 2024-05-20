import {useSelector} from "react-redux";
import {} from "@reduxjs/toolkit"
import { AllState } from "../../states/allState";

export const useProduct = () => useSelector((state: AllState) => state.product)
