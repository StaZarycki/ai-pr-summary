import { getConfig } from "./config.ts";

export class JiraService {
  private baseUrl: string;
  private email: string;
  private apiToken: string;

  constructor() {
    const { JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN } = getConfig();

    if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_API_TOKEN) {
      throw new Error("Missing JIRA configuration.");
    }

    this.baseUrl = JIRA_BASE_URL.replace(/\/$/, "");
    this.email = JIRA_EMAIL;
    this.apiToken = JIRA_API_TOKEN;
  }

  async getIssueDescription(issueKey: string): Promise<string> {
    const url = `${this.baseUrl}/rest/api/3/issue/${issueKey}?fields=description`;
    const auth = Buffer.from(`${this.email}:${this.apiToken}`).toString(
      "base64",
    );

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Jira issue ${issueKey}`);
    }

    const data = await response.json();
    return this.extractText(data.fields?.description) ?? "";
  }

  private extractText(node: any): string {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node))
      return node.map((n) => this.extractText(n)).join("");
    if (node.content) return this.extractText(node.content);
    if (node.text) return node.text;
    return "";
  }
}
