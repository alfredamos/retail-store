import { LoaderFunction } from "react-router-dom";
import { usersQuery } from "../../queries/users/usersQuery";
import { QueryClient } from "@tanstack/react-query";
import { User } from "../../validations/userValidation";
import { getResourcesOrFetchResources } from "../../general/getResourcesOrFetchResources";

export const getAllUserLoader =(queryClient: QueryClient): LoaderFunction => async () => {
  try {
    const query = usersQuery();
    const usersDb = getResourcesOrFetchResources<User[]>(
      query,
      queryClient
    );

    return usersDb;

  } catch (error: unknown) {
    return error;
  }
};
