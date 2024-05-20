import { APIService } from "../services/dataService";
import { User } from "../validations/userValidation";

export const userService = new APIService<User>("/users");