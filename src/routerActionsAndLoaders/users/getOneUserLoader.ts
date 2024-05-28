import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { userOneQuery } from "../../queries/users/userOneQuery";
import { getResourcesOrFetchResources } from "../../general/getResourcesOrFetchResources";
import { User } from "../../validations/userValidation";

export const getOneUserLoader =(queryClient: QueryClient): LoaderFunction => async ({ params }) => {
  try {
    const id = params.id as string;
    const query = userOneQuery(id)
    const userDb = getResourcesOrFetchResources<User>(query, queryClient);

    return userDb;
  } catch (error: unknown) {
    return error;
  }
};
