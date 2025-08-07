import { z } from "zod";

const githubSchema = z.object({
  full_name: z.string(),
});

export const stringToJson = z
  .string()
  .transform((str, ctx): z.infer<typeof githubSchema> => {
    try {
      return JSON.parse(str);
    } catch (error) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });

      return z.NEVER;
    }
  });

const schema = z.object({
  GITHUB_TOKEN: z.string(),
  GEMINI_API_KEY: z.string().optional(),

  // GitHub Actions
  PR_NUMBER: z.coerce.number(),
  BRANCH_NAME: z.string(),
  REPO_CONTEXT: stringToJson.pipe(githubSchema),
});

export function getConfig(
  env: NodeJS.ProcessEnv = process.env,
): z.infer<typeof schema> {
  return schema.parse(env);
}
