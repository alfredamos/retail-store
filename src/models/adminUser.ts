import { Role } from "./role";

export class AdminUser {
  id: string = "";
  name!: string;
  email!: string;
  phone!: string;
  role!: Role;
}
