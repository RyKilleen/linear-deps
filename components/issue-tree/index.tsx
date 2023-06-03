import { HashItem } from "@/lib/createTree";
import styles from "./styles.module.css";

type IssueTreeProps = {
  data: HashItem<IssueWithRelations>[];
};
export const IssueTree = ({ data }: IssueTreeProps) => {
  return (
    <ul>
      {data.map((item) => (
        <TreeItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const BASE_WIDTH = 80;
const EFFORT_MULTIPLIER = 50;

const TreeItem = ({
  item,
  depth = 0,
}: {
  item: HashItem<IssueWithRelations>;
  depth?: number;
}) => {
  const width = BASE_WIDTH + item.estimate * EFFORT_MULTIPLIER;
  const style = {
    "--issue-depth": depth,
    "--issue-estimate": item.estimate,
  } as React.CSSProperties;
  return (
    <li className={styles.item} style={style}>
      <div className={styles.itemLabel} style={style}>
        {item.title} - {item.estimate}
      </div>
      <ul>
        {item.children.map((child) => (
          <TreeItem key={child.id} item={child} depth={depth + 1} />
        ))}
      </ul>
    </li>
  );
};
