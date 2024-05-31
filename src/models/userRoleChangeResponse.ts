import { Gender } from "./gender";
import { Role } from "./role";

export class UserRoleChangeResponse{
  id: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  role: Role = Role.Customer;
  gender: Gender = Gender.Male;
}