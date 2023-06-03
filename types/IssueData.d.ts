type IssueWithRelations = Pick<IssueFragment, "id" | "title" | "estimate"> & {
  inverseRelations: {
    nodes: (Pick<IssueRelationFragment, "type"> & {
      issue: Pick<Issue, "id" | "title">;
    })[];
  };
};
