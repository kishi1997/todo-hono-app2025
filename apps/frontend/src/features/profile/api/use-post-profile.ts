import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setProfile } from "../action";

type SetProfileVariables = {
  name: string;
};

export const usePostProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, SetProfileVariables>({
    mutationFn: async (variables: SetProfileVariables) => {
      await setProfile(variables.name);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
