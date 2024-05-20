import { Role } from "./role";

export class CurrentUser{
  id: string = "";
  name: string = "";
  email: string = "";
  phone: string = "";
  role?: Role;  
}