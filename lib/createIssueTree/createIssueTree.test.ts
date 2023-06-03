import TEST_ISSUES from "./test-data.json";
import TEST_RESULTS from "./test-result.json";
import { createIssueTree } from "./";

describe("createIssueTree", () => {
  it("should return a tree", () => {
    const tree = createIssueTree(TEST_ISSUES);

    expect(tree).toEqual(TEST_RESULTS);
  });
});
