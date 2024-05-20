import { AdminUser } from "../models/adminUser";
import { Role } from "../models/role";
import store from "../store";
import { Signup } from "../validations/signupValidation";

export function adminSignupNewUser(initialSignup: Signup) {
  const currentUser = store.getState().auth.currentUser;
  
  if(!currentUser) return initialSignup;
  
  if (currentUser?.role?.includes(Role.Admin)) {
    console.log("At point 1, am in!")
    const adminUser: AdminUser = {
      id: currentUser.id as string,
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      role: Role.Admin,
    };
    console.log("At point 2, am out!");
    const newSignupByAdmin = { ...initialSignup, adminUser: currentUser ? adminUser : {} };
    console.log({newSignupByAdmin})
    return newSignupByAdmin;
  }
}
