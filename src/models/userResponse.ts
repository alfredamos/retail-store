import { Role } from "./role";

export class UserResponse {
  id: string = "";
  name!: string;
  email!: string;
  gender!: string;
  phone!: string;
  role!: Role;
}