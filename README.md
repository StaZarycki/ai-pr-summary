# AI Pull-Request Summaries

This Bun-based TypeScript tool fetches a pull request's diff from GitHub, generates a natural-language summary with an AI model, and posts that summary back to the PR as a comment.

## Features

- **GitHub Integration**: uses Octokit to retrieve PR diffs and post comments.
- **AI Provider Strategy**: pluggable strategy interface; the default implementation uses Google's Gemini model.
- **System Instructions**: persona-based prompts (product manager, tech lead, etc.) tailor the summary style.
- **Zod-Validated Configuration**: environment variables are checked on startup for a safe CI experience.

## Getting Started

1. **Install dependencies**
   ```bash
   bun install
   ```
2. **Set required environment variables**
   - `GITHUB_TOKEN`
   - `REPO_NAME`
   - `REPO_OWNER`
   - `PR_NUMBER`
   - (optional) `GEMINI_API_KEY` or other provider keys
3. **Run the script**
   ```bash
   bun run src/index.ts
   ```

## Key Concepts for Newcomers

1. **Strategy Pattern** – AI providers implement a common interface so new models can be added by swapping the strategy.
2. **System Instructions** – Different personas change how the summary is written via predefined prompt templates.
3. **Environment Configuration** – Credentials and runtime settings are validated with Zod.
4. **Bun Runtime** – Use `bun install` and `bun run` to manage dependencies and execute the script.

## Next Steps

- Explore Octokit's wider API surface for more complex PR interactions.
- Experiment with different AI models or prompt structures by adding new strategies.
- Customize system instructions or add the TODO Jira context.
- Tighten TypeScript or linting rules as the project grows.
