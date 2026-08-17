import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  activateFormType,
  deactivateFormType,
} from "../api/form-type-service";

export function useFormTypeActions() {
  const queryClient = useQueryClient();

  const invalidate = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["form-types"],
    });
  };

  const activate = useMutation({
    mutationFn: (formTypeId: string) =>
      activateFormType(formTypeId),
    onSuccess: invalidate,
  });

  const deactivate = useMutation({
    mutationFn: (formTypeId: string) =>
      deactivateFormType(formTypeId),
    onSuccess: invalidate,
  });

  return {
    activate,
    deactivate,
  };
}