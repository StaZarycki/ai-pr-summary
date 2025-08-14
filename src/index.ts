import { GithubService } from "./github.service.ts";
import { AiProviderContext } from "./ai-providers/ai-provider.context.ts";
import { GeminiStrategy } from "./ai-providers/gemini.strategy.ts";
import { systemInstructionPM } from "./ai-providers/data/systemInstruction.ts";
import { JiraService } from "./jira.service.ts";

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

  const { title, diff } = await githubService.getPRData();

  let jiraDescription = "";
  const jiraKeyMatch = title.match(/[A-Z]+-\d+/);
  if (jiraKeyMatch) {
    try {
      const jiraService = new JiraService();
      jiraDescription = await jiraService.getIssueDescription(jiraKeyMatch[0]);
    } catch (error) {
      console.error("Failed to fetch Jira issue", error);
    }
  }

  const input = jiraDescription ? `${jiraDescription}\n\n${diff}` : diff;
  const generatedSummary = await aiProviderContext.generateSummary(input);

  await githubService.postCommentToPR(generatedSummary);
}

main().catch((error) => {
  console.error(error);

  return 1;
});
