import type { SystemInstruction } from "./data/systemInstruction.ts";

export interface Strategy {
  setSystemInstruction(instruction: SystemInstruction): void;

  generateSummary(diff: string): Promise<string>;
}
