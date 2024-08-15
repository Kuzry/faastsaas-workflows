import { z } from "zod";

export const getUpdateUserConsentFormSchema = () =>
  z.object({
    consent: z.boolean().optional(),
  });

export type TUpdateUserConsentFormSchema = z.infer<
  ReturnType<typeof getUpdateUserConsentFormSchema>
>;
