import { QueryClient } from "@tanstack/react-query";

type Query<T> = {
  queryKey: string[],
  queryFn: () => Promise<T>;
}

export async function getResourcesOrFetchResources<T>(query: Query<T>, queryClient: QueryClient){
 return (
      queryClient?.getQueryData(query?.queryKey) ??
      (await queryClient?.fetchQuery(query)))
}


