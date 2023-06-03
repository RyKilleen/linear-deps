// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createIssueTree } from "@/lib/createIssueTree";
import { linearClient } from "@/linear-client";
import { Issue } from "@linear/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  issues: Issue[];
};

async function getMyIssues() {
  const graphQLClient = linearClient.client;
  const issuesAndRelations = await graphQLClient.rawRequest<
    {
      issues: Issue[];
    },
    {}
  >(`
query ExampleQuery {
  issues {
    nodes {
      id
      title
      inverseRelations {
        nodes {
          type
          issue {
            id
            title
          }
        }
      }
    }
  }
}
`);
  return issuesAndRelations;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await getMyIssues();
  if (response.data) {
    const tree = createIssueTree(response.data.issues.nodes);
    res.status(200).json(tree);
  } else {
    res.status(500);
  }
}
