import { GithubService } from "./github.service.ts";

async function main(): Promise<void> {
  const githubService = new GithubService();
  
  const prDetails = await githubService.getPRDetails();
  console.log(prDetails);
  
  await githubService.postCommentToPR("Test comment");
}

main().catch((error) => {
  console.error(error);

  return 1;
});
