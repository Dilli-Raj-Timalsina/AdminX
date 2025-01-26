import { z } from "zod";

export const commonValidations = {
  id: z.string().transform((val) => val.trim()),
};
