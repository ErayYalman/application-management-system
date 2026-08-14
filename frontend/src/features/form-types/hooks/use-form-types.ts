import { useQuery } from "@tanstack/react-query";

import { getFormTypes } from "../api/form-type-service";

export function useFormTypes() {
  return useQuery({
    queryKey: ["form-types"],
    queryFn: getFormTypes,
    staleTime: 5 * 60 * 1000,
  });
}