import { AbstractCredential } from "@/credentials/AbstractCredential";
import { AnyZodObject, z } from "zod";

export class ClickUpCredential extends AbstractCredential {
  constructor() {
    super("clickUpOAuth2Api", "ClickUp");
  }

  getSchema(): AnyZodObject {
    return z.object({
      something: z.string().min(1, {
        message: "mememememememme",
        // message: t("apps.clickUpOAuth2Api.fields.something.messages.too_small"),
      }),
    });
  }
}
