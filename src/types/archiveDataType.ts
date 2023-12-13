interface NodeData {
  id: number;
  content: string;
  tags: string[];
  consciousness: number;
  time: number;
  feeling: number;
  groupIds: number[];
  tagGroups: GroupData[];
}

interface GroupData {
  groupId: number;
  keyword: string;
  links: number[];
  color: string;
}

interface LinkData {
  linkId: number;
  source: number;
  target: number;
  groupId: number;
}

interface InitialGraphData {
  nodes: NodeData[];
  links: LinkData[];
  groups: GroupData[];
}