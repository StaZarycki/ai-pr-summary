import { getConfig } from "./config.ts";
import { Octokit } from "@octokit/rest";

export class GithubService {
  private octokit!: Octokit;
  private prNumber!: number;
  private owner!: string;
  private repo!: string;

  private init() {
    const { GITHUB_TOKEN, REPO_CONTEXT, PR_NUMBER } = getConfig();

    const [owner, repo] = REPO_CONTEXT.full_name.split("/");
    if (!owner || !repo) {
      throw new Error("Missing owner or repo name.");
    }

    this.prNumber = PR_NUMBER;
    this.owner = owner;
    this.repo = repo;

    this.octokit = new Octokit({ auth: GITHUB_TOKEN });
  }

  constructor() {
    this.init();
  }

  async getPRDetails() {
    const response = await this.octokit.pulls.get({
      owner: this.owner,
      repo: this.repo,
      pull_number: this.prNumber,
      mediaType: {
        format: "diff",
      },
    });

    return response.data;
  }

  async postCommentToPR(comment: string) {
    await this.octokit.issues.createComment({
      owner: this.owner,
      repo: this.repo,
      issue_number: this.prNumber,
      body: comment,
    });
  }
}
