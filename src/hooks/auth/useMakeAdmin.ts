import { useMutation } from "@tanstack/react-query";
import { userChangeRoleService } from "../../APIRoutes/authRoutes";
import { UserRole } from '../../validations/userRoleChangeValidation';

export function useMakeAdmin(){
  return useMutation({
    mutationFn: (userRole: UserRole) => userChangeRoleService.passwordAndProfileUpdate(userRole),
  });
}