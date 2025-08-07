import { GithubService } from "./github.service.ts";
import { AiProviderContext } from "./ai-providers/ai-provider.context.ts";
import { GeminiStrategy } from "./ai-providers/gemini.strategy.ts";
import { systemInstructionPM } from "./ai-providers/data/systemInstruction.ts";

async function main(): Promise<void> {
  let githubService: GithubService;
  try {
    githubService = new GithubService();
  } catch (error) {
    console.error(error);

    return;
  }
  const aiProviderContext = new AiProviderContext(new GeminiStrategy(), {
    systemInstruction: systemInstructionPM,
  });

  const prDiff = String(await githubService.getPRDetails());
  const generatedSummary = await aiProviderContext.generateSummary(prDiff);

  await githubService.postCommentToPR(generatedSummary);
}

main().catch((error) => {
  console.error(error);

  return 1;
});
