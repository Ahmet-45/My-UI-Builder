// src/utils/styleParser.ts
import { NodeProps } from "../types/builder";

export const parseStyles = (rawProps: NodeProps) => {
  const parsedStyles: Record<string, string | number> = {};

  for (const [key, value] of Object.entries(rawProps)){
    if (value !== undefined && value !== null){
      parsedStyles[key] = typeof value === "number" ?  `${value}px` :  value;
    }
  }
  return parsedStyles;
}