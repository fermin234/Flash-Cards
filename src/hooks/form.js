import { useCallback, useState } from "react";

export const useForm = (baseState) => {
  const [form, setFrom] = useState(baseState);

  const handleChange = useCallback(
    (update) => {
      const { key, value } = update;

      setFrom((prev) => {
        if (!key) {
          return update;
        }
        return { ...prev, [key]: value };
      });
    },
    [setFrom]
  );

  return [form, handleChange];
};
