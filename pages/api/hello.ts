// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { linearClient } from "@/linear-client";
import type { NextApiRequest, NextApiResponse } from "next";

const query = `
query ExampleQuery {
  issues {
    nodes {
      id
      title
      estimate
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
`;
type Data = IssueWithRelations[];
async function getMyIssues() {
  const graphQLClient = linearClient.client;
  const issuesAndRelations = await graphQLClient.rawRequest<
    {
      issues: {
        nodes: IssueWithRelations[];
      };
    },
    {}
  >(query);
  return issuesAndRelations;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await getMyIssues();
  if (response.data?.issues?.nodes) {
    res.status(200).json(response.data.issues.nodes);
  } else {
    res.status(500);
  }
}
