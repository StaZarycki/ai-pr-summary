import type { Strategy } from "./strategy.ts";
import { GoogleGenAI } from "@google/genai";
import { getConfig } from "../config.ts";

export class GeminiStrategy implements Strategy {
  private ai: GoogleGenAI;
  private systemInstruction: string = "";

  constructor() {
    const { GEMINI_API_KEY } = getConfig();
    this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  setSystemInstruction(instruction: string): void {
    this.systemInstruction = instruction;
  }

  async generateSummary(diff: string): Promise<string> {
    const message = `
    **Code diff:**
    ${diff}
    `;

    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: message,
      config: {
        systemInstruction: this.systemInstruction,
      },
    });

    return response.text || "Gemini could not generate a response.";
  }
}
