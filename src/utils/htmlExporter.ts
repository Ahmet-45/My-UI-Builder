// src/utils/htmlExporter.ts
import { UINode, NodeProps, NODE_REGISTRY } from '../types/builder';

const UNITLESS = new Set(['flexShrink', 'flexGrow', 'zIndex', 'opacity', 'fontWeight']);
const NON_STYLE = new Set(['text', 'widthUnit', 'heightUnit']);

function parsePropsToStyle(props: NodeProps): string {
  const styles: string[] = [];
  for (const [key, value] of Object.entries(props)) {
    if(NON_STYLE.has(key)) continue;
    if(value === undefined || value === null) continue;
    
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();

    if (key === 'width' && typeof value === 'number') {
      styles.push(`width: ${value}${props.widthUnit ?? 'px'};`);
    } else if (key === 'height' && typeof value === 'number') {
      styles.push(`height: ${value}${props.heightUnit ?? 'px'};`);
    } else if (typeof value === 'number' && !UNITLESS.has(key)) {
      styles.push(`${cssKey}: ${value}px;`);
    } else {
      styles.push(`${cssKey}: ${value};`);
    }
  }
  return styles.join(' ');
}

export function exportToHTML(node: UINode): string {
  const { tag, selfClosing } = NODE_REGISTRY[node.type];
  const inlineStyle = parsePropsToStyle(node.props || {});
  const styleAttribute = inlineStyle ? ` style="${inlineStyle}"`: "";

  if (selfClosing) {
    const placeholder = node.props?.text ? ` placeholder="${node.props.text}"` : "";
    return `<${tag}${styleAttribute}${placeholder} />`;
  }
  let childrenHTML = "";
  if(node.children && node.children.length > 0){
    childrenHTML = node.children.map(child => exportToHTML(child)).join("");
  }
  const content = node.props?.text ?? childrenHTML;
  return `<${tag}${styleAttribute}>${content}</${tag}>`;
}


export function exportFullPage(tree: UINode): string {
  const body = exportToHTML(tree);
  return  `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Export</title>
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}