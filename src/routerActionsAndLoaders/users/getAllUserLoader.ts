import { LoaderFunction } from "react-router-dom";
import { usersQuery } from "../../queries/users/usersQuery";
import { QueryClient } from "@tanstack/react-query";

export const getAllUserLoader =(queryClient: QueryClient): LoaderFunction => async () => {
  try {
    const query = usersQuery();
    return queryClient.ensureQueryData(query)

  } catch (error: unknown) {
    return error;
  }
};
