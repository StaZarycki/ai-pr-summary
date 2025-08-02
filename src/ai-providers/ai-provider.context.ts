import type { Strategy } from "./strategy.ts";
import type { SystemInstruction } from "./data/systemInstruction.ts";

export class AiProviderContext {
  private strategy: Strategy;

  constructor(
    strategy: Strategy,
    options?: { systemInstruction: SystemInstruction },
  ) {
    this.strategy = strategy;

    if (options) {
      this.strategy.setSystemInstruction(options.systemInstruction);
    }
  }

  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }

  async generateSummary(diff: string): Promise<string> {
    return this.strategy.generateSummary(diff);
  }
}
