type MdastNode = {
  type: string;
  value?: string;
  children?: MdastNode[];
};

/**
 * Repair label-style emphasis that CommonMark cannot parse when a closing
 * marker is immediately followed by CJK or alphanumeric text, for example:
 *
 *   **过程：**状态变化如下
 *
 * Authors should still prefer a space after the marker. This transformer is a
 * site-wide safety net for existing content and connector-written MDX.
 */
export default function remarkRepairStrongLabels() {
  return (tree: MdastNode): void => {
    visit(tree);
  };
}

function visit(parent: MdastNode): void {
  if (!parent.children) return;

  const repaired: MdastNode[] = [];

  for (const child of parent.children) {
    if (child.type === 'text' && typeof child.value === 'string') {
      repaired.push(...repairText(child.value));
      continue;
    }

    visit(child);
    repaired.push(child);
  }

  parent.children = repaired;
}

function repairText(value: string): MdastNode[] {
  const pattern = /\*\*([^*\n]+?[：:])\*\*(?=[A-Za-z0-9\u3400-\u9fff])/g;
  const nodes: MdastNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > cursor) {
      nodes.push({ type: 'text', value: value.slice(cursor, match.index) });
    }

    nodes.push({
      type: 'strong',
      children: [{ type: 'text', value: match[1] }],
    });
    cursor = pattern.lastIndex;
  }

  if (nodes.length === 0) return [{ type: 'text', value }];

  if (cursor < value.length) {
    nodes.push({ type: 'text', value: value.slice(cursor) });
  }

  return nodes;
}
