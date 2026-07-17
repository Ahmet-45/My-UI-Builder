// src/store/useBuilderStore.ts
import { create } from 'zustand';
import { UINode, NodeProps, NodeType, NODE_REGISTRY } from '../types/builder';
import { updateNodeProps, insertNode, findNodeById, findParentOf, insertAfter } from '../utils/treeHelpers';


const initialTree: UINode = {
  id: "root-1",
  type: "container",
  props: {
    backgroundColor: 'red',
    width: 500,        
  },
  children: [
    {
      id: "btn-1",
      type: "button",
      props: {
        backgroundColor: 'blue',
        width: 150
      }
    }
  ]    
};

interface BuilderStore {
  tree: UINode;
  selectedNodeId: string | null;
  selectNode: (id: string | null) => void;
  updateNode: (newProps: Partial<NodeProps>) => void;
  addNode: (nodeType: NodeType) => void;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({

  tree: initialTree,
  selectedNodeId: null,

  selectNode: (id) => {
    set(() => ({ selectedNodeId: id }))
  },
  updateNode: (newProps) => {
    const state = get();
    if (!state.selectedNodeId) return;
    const newTree = updateNodeProps(state.tree, state.selectedNodeId, newProps);
    set({ tree: newTree });
  },
  addNode: (nodeType: NodeType) => {
    const { tree, selectedNodeId } = get();

    const targetId = selectedNodeId ?? tree.id;

    const target = findNodeById(tree, targetId);
    if(!target) return;

    const newNode: UINode = {
      id: crypto.randomUUID(),
      type: nodeType,
      props: {},
      children: [],
    };
    let newTree: UINode;

    if(NODE_REGISTRY[target.type].acceptsChildren){
      newTree = insertNode(tree, targetId, newNode);
    }else{

      const parent = findParentOf(tree, targetId);
      if(!parent) return;
      newTree = insertAfter(tree, targetId, newNode);
    }

    set({ tree: newTree });
  },
}));


