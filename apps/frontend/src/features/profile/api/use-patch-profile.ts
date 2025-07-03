import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../action";

type SetProfileVariables = {
  id: string;
  name: string;
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, SetProfileVariables>({
    mutationFn: async (variables: SetProfileVariables) => {
      const newData = { json: { ...variables } };
      await updateProfile(newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
