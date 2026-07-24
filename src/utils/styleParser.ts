// src/utils/styleParser.ts
import { NodeProps } from "../types/builder";

const UNITLESS = new Set(['zIndex', 'opacity', 'flex', 'flexGrow', 'flexShrink', 'order', 'lineHeight']);
const NON_STYLE = new Set(['text', 'widthUnit', 'heightUnit']);

export const parseStyles = (rawProps: NodeProps) => {
  const parsed: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(rawProps)){
    if(NON_STYLE.has(key)) continue;
    if (value === undefined && value === null) continue;

    if (key === 'width' && typeof value === 'number') {
      parsed.width = `${value}${rawProps.widthUnit ?? 'px'}`;
    } else if (key === 'height' && typeof value === 'number') {
      parsed.height = `${value}${rawProps.heightUnit ?? 'px'}`;
    } else if (typeof value === 'number' && !UNITLESS.has(key)) {
      parsed[key] = `${value}px`;
    } else {
      parsed[key] = value;
    }
  }
  return parsed;
};