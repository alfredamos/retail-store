import {useSelector} from "react-redux";
import {} from "@reduxjs/toolkit"
import { AllState } from "../../states/allState";

export const useUser = () => useSelector((state: AllState) => state.user)
