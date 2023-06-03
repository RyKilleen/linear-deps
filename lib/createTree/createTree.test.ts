import { createTree } from "./";
it("creates a correct shape of dataTree", () => {
  const dataSet = [
    {
      ID: 1,
      Phone: "(403) 125-2552",
      City: "Coevorden",
      Name: "Grady",
    },
    {
      ID: 2,
      parentID: 1,
      Phone: "(979) 486-1932",
      City: "Chełm",
      Name: "Scarlet",
    },
  ];

  const expectedDataTree = [
    {
      ID: 1,
      Phone: "(403) 125-2552",
      City: "Coevorden",
      Name: "Grady",
      children: [
        {
          ID: 2,
          parentID: 1,
          Phone: "(979) 486-1932",
          City: "Chełm",
          Name: "Scarlet",
          children: [],
        },
      ],
    },
  ];
  const myTree = createTree(dataSet, { idKey: "ID", parentIdKey: "parentID" });
  expect(myTree).toEqual(expectedDataTree);
});
