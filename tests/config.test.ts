import { expect, test, describe } from "bun:test";
import { stringToJson } from "../src/config.ts";

describe("stringToJson", () => {
  test("parses valid JSON strings into objects", () => {
    const json = '{"full_name":"octocat/Hello-World"}';
    const result = stringToJson.parse(json);
    expect(result).toEqual({ full_name: "octocat/Hello-World" });
  });

  test("reports Invalid JSON on malformed input", () => {
    const invalid = "{full_name:}";
    const result = stringToJson.safeParse(invalid);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid JSON");
    }
  });
});
