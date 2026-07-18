// src/utils/htmlExporter.ts
import { UINode, NodeProps } from '../types/builder';

const UNITLESS = new Set(['flexShrink', 'flexGrow', 'zIndex', 'opacity', 'fontWeight']);


function parsePropsToStyle(props: NodeProps): string {
  const styles: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && value !== null) {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      if (typeof value === 'number' && !UNITLESS.has(key)) {
        styles.push(`${cssKey}: ${value}px;`);
      } else {
        styles.push(`${cssKey}: ${value};`);
      }
    }
  }
  return styles.join(' ');
}

export function exportToHTML(node: UINode): string {
  const tag = node.type === "container" ? "div" : "button";
  const inlineStyle = parsePropsToStyle(node.props || {});
  const styleAttribute = inlineStyle ? ` style="${inlineStyle}"`: "";

  let childrenHTML = "";
  if(node.children && node.children.length > 0){
    childrenHTML = node.children.map(child => exportToHTML(child)).join("");
  }
  return `<${tag}${styleAttribute}>${childrenHTML}</${tag}>`;
}