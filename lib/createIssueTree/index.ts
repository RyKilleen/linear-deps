import { createTree } from "../createTree";

export const createIssueTree = (issues: IssueWithRelations[]) => {
  const smushedIssues = issues.map((issue) => ({
    ...issue,
    parentId: issue.inverseRelations.nodes[0]?.issue.id,
  }));

  const tree = createTree(smushedIssues, {
    idKey: "id",
    parentIdKey: "parentId",
  });

  return tree;
};
