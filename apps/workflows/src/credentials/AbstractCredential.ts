import { AnyZodObject } from "zod";

export abstract class AbstractCredential {
  protected constructor(
    public id: string,
    public name: string
  ) {}

  abstract getSchema(): AnyZodObject;
}
