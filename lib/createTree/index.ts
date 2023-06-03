// Built on https://stackoverflow.com/a/40732240/2552310
// Converted for typescript
// extended with config

type KeyOfArrayItems<T extends Array<{}>> = keyof T[number];

type Config<T extends Array<{}>> = {
  idKey: KeyOfArrayItems<T>;
  parentIdKey: KeyOfArrayItems<T>;
};

export type HashItem<T> = T & { children: HashItem<T>[] };
export const createTree = <
  Data extends Array<{
    [key: string | number]: any;
  }>,
  C extends Config<Data>
>(
  dataset: Data,
  config: C
) => {
  type Item = Data[number];

  const { idKey, parentIdKey } = config;

  const hashMap: Map<string | number, HashItem<Item>> = new Map();
  dataset.forEach((aData: Item) => {
    const aDataID = aData[idKey];
    hashMap.set(aDataID, { ...aData, children: [] });
  });
  const dataTree: HashItem<Item>[] = [];
  dataset.forEach((aData: Item) => {
    const parentKey = aData[parentIdKey];
    const key = aData[idKey];
    const entry = hashMap.get(key);
    if (parentKey) {
      const x = hashMap.get(parentKey);
      entry && x && x.children.push(entry);
    } else {
      entry && dataTree.push(entry);
    }
  });
  return dataTree;
};
