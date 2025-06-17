import { useQuery } from "@tanstack/react-query";
import { ProfileGetResponse } from "@/types/api";
import { getProfile } from "../action";

export const useGetProfile = () => {
  const query = useQuery<ProfileGetResponse, Error>({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getProfile();
      return user;
    },
  });
  return query;
};
