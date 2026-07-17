// src/utils/treeHelpers.ts
import { NodeProps, UINode } from "../types/builder";

/**
 * Belirtilen ID'ye sahip düğümü ağaç içinde rekürsif (DFS) olarak arar.
 * @param currentNode Aramaya başlanacak mevcut düğüm (Kök düğüm veya alt dallar)
 * @param targetId Aranan düğümün benzersiz ID'si
 * @returns Bulunan UINode veya bulunamazsa null
 */

export function updateNodeProps(node: UINode, targetId: string,    newProps: Partial<NodeProps>): UINode {

  if (node.id === targetId){
    return {
      ...node,
      props: { ...node.props, ...newProps}
    };
  }

  if(!node.children || node.children.length === 0){
    return node;
  }
  let changed = false;

  const nextChildren = node.children.map((child) => {
    const nextChild = updateNodeProps(child, targetId, newProps);

    if (nextChild !== child){
      changed = true;
    }
    return nextChild;
  });

  return changed ? { ...node, children: nextChildren } : node;
}

export function findNodeById(currentNode: UINode, targetId: string): UINode | null {
  if(currentNode.id === targetId){
    return currentNode;
  }

  if(currentNode.children && currentNode.children?.length > 0){
    for(const child of currentNode.children){
      const result = findNodeById(child, targetId);
      if(result){
        return result;
      }
    }
  }
  return null;
}

export function insertNode(node: UINode, parentId: string, newNode: UINode): UINode {
  if (node.id === parentId){
    return {
      ...node,
      children: node.children ? [...node.children, newNode] : [newNode]
    };
  }

  if(!node.children || node.children.length === 0){
    return node;
  }
  let changed = false;

  const nextChildren = node.children.map((child) => {
    const nextChild = insertNode(child, parentId, newNode);

    if (nextChild !== child){
      changed = true;
    }
    return nextChild;
  });

  return changed ? { ...node, children: nextChildren } : node;
}

export function insertAfter(node: UINode, targetId: string, newNode: UINode): UINode {
  if(node.children){
    const i = node.children.findIndex(child => child.id === targetId);
    if ( i !== -1){    
      return { 
        ...node, 
        children: [
          ...node.children.slice(0, i + 1),
          newNode,
          ...node.children.slice(i + 1),
        ],
      };
    }
  }

  if (!node.children || node.children.length === 0) return node;
  
  let changed = false;
  const nextChildren = node.children.map((child) => {
    const nextChild = insertAfter(child, targetId, newNode);
    if (nextChild !== child) changed = true;
    return nextChild;
  });
  return changed ? { ...node, children: nextChildren } : node;
}

export function findParentOf(root: UINode, childId: string): UINode | null {
  if(!root.children || root.children.length === 0){
    return null;
  }
  const isDirectChild = root.children.some(child => child.id === childId);
  if (isDirectChild){
    return root;
  }

  for (const child of root.children){
    const result = findParentOf(child, childId);
    if(result) return result;
  }
  return null;
}
