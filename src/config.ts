import zod from "zod";

const githubSchema = zod.object({
  full_name: zod.string(),
});

const stringToJson = zod
  .string()
  .transform((str, ctx): zod.infer<typeof githubSchema> => {
    try {
      return JSON.parse(str);
    } catch (error) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });

      return zod.NEVER;
    }
  });

const schema = zod.object({
  GITHUB_TOKEN: zod.string(),

  // GitHub Actions
  PR_NUMBER: zod.coerce.number(),
  BRANCH_NAME: zod.string(),
  REPO_CONTEXT: stringToJson.pipe(githubSchema),
});

const parsedSchema: zod.infer<typeof schema> = schema.parse(process.env);

export function getConfig(): typeof parsedSchema {
  return parsedSchema;
}
