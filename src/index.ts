import { GithubService } from "./github.service.ts";

async function main(): Promise<void> {
  const githubService = new GithubService();
  
  const prDetails = await githubService.getPRDetails();
  console.log(prDetails);
}

main().catch((error) => {
  console.error(error);

  return 1;
});
