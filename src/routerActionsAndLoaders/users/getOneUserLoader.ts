import { LoaderFunction } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { userOneQuery } from "../../queries/users/userOneQuery";

export const getOneUserLoader =(queryClient: QueryClient): LoaderFunction => async ({ params }) => {
  try {
    const id = params.id as string;
    const query = userOneQuery(id)
    queryClient.ensureQueryData(query);
    return query;
  } catch (error: unknown) {
    return error;
  }
};
