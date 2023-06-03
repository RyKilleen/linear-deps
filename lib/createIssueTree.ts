import { Issue, IssueRelation } from "@linear/sdk";
import { createTree } from "./createTree";
import {
  IssueFragment,
  IssueRelationFragment,
} from "@linear/sdk/dist/_generated_documents";

type IssueWithRelations = Pick<IssueFragment, "id" | "title"> & {
  inverseRelations: {
    nodes: (Pick<IssueRelationFragment, "type"> & {
      issue: Pick<Issue, "id" | "title">;
    })[];
  };
};

export const createIssueTree = (issues: IssueWithRelations[]) => {
  const smushedIssues = issues.map((issue) => ({
    id: issue.id,
    parentIssueId: issue.inverseRelations.nodes[0]?.issue.id,
  }));
  console.log({ smushedIssues });
  const tree = createTree(smushedIssues, {
    idKey: "id",
    parentIdKey: "parentIssueId",
  });

  console.log({ tree });
  return tree;
};
