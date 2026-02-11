import type { Root, Element, Text } from "hast";
import { visit } from "unist-util-visit";

type HastNode = Root | Element | Text;

/**
 * 마크다운 파서가 **...** 를 strong으로 인식하지 못해 그대로 출력되는 경우,
 * rehype 단계에서 텍스트 노드 안의 **내용** 을 <strong>으로 바꾼다.
 */
function buildBoldReplacementNodes(value: string): HastNode[] | null {
  const regex = /\*\*([^*]+)\*\*/g;
  const matches = [...value.matchAll(regex)];
  if (matches.length === 0) return null;

  const newNodes: HastNode[] = [];
  let lastIndex = 0;

  for (const m of matches) {
    const fullMatch = m[0];
    const innerText = m[1];
    const matchIndex = m.index!;
    if (matchIndex > lastIndex) {
      newNodes.push({ type: "text", value: value.slice(lastIndex, matchIndex) });
    }
    newNodes.push({
      type: "element",
      tagName: "strong",
      properties: {},
      children: [{ type: "text", value: innerText }],
    } as Element);
    lastIndex = matchIndex + fullMatch.length;
  }
  if (lastIndex < value.length) {
    newNodes.push({ type: "text", value: value.slice(lastIndex) });
  }
  return newNodes;
}

export default function rehypeFixBold() {
  return (tree: Root) => {
    const replacements: {
      parent: { children: HastNode[] };
      index: number;
      newNodes: HastNode[];
    }[] = [];

    visit(tree, "text", (node: Text, index, parent) => {
      if (parent === undefined || index === undefined) return;
      const el = parent as Element;
      if (el.type === "element") {
        const tag = el.tagName?.toLowerCase();
        if (tag === "code" || tag === "pre" || tag === "script" || tag === "style") return;
      }

      const newNodes = buildBoldReplacementNodes(node.value);
      if (newNodes === null) return;

      replacements.push({
        parent: parent as { children: HastNode[] },
        index,
        newNodes,
      });
    });

    replacements.sort((a, b) => {
      if (a.parent !== b.parent) return 0;
      return b.index - a.index;
    });
    for (const { parent, index, newNodes } of replacements) {
      parent.children.splice(index, 1, ...newNodes);
    }
  };
}
