import testData from "./test-data.json";
import { createIssueTree } from "./createIssueTree";

const CORRECT_TREE = [
  {
    id: "0ca557df-04d5-4bda-bef2-c5c9d4b174a2",
    parentIssueId: undefined,
    children: [
      {
        id: "d00bf554-88ec-4024-ad29-51eb17f4e8f1",
        parentIssueId: "0ca557df-04d5-4bda-bef2-c5c9d4b174a2",
        children: [
          {
            id: "2777e0b8-b67d-4a34-9a90-084c8888149f",
            parentIssueId: "d00bf554-88ec-4024-ad29-51eb17f4e8f1",
            children: [],
          },
        ],
      },
    ],
  },
];

describe("createIssueTree", () => {
  it("should return a tree", () => {
    const tree = createIssueTree(testData);

    expect(tree).toEqual(CORRECT_TREE);
  });
});
