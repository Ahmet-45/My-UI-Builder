// src/store/useBuilderStore.ts
import { create } from 'zustand';
import { UINode, NodeProps, NodeType, NODE_REGISTRY } from '../types/builder';
import { updateNodeProps, insertNode, findNodeById, findParentOf, insertAfter } from '../utils/treeHelpers';
import { removeNode } from '../utils/treeHelpers';

function readSaves(): Record<string, UINode> {
  const raw = localStorage.getItem(SAVES_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeSaves(saves: Record<string, UINode>) {
  localStorage.setItem(SAVES_KEY, JSON.stringify(saves));
}

const initialTree: UINode = {
  id: "root-1",
  type: "container",
  props: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
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

const SAVES_KEY = 'ui-builder-saves';
interface BuilderStore {
  tree: UINode;
  selectedNodeId: string | null;
  selectNode: (id: string | null) => void;
  updateNode: (newProps: Partial<NodeProps>) => void;
  addNode: (nodeType: NodeType) => void;
  moveNode: (draggedId: string, targetId: string) => void;
  deleteNode: () => void;
  resetTree: () => void;
  dragOverId: string | null;
  setDragOverId: (id: string | null) => void;
  saveTree: (name: string) => void;
  loadTree: (name: string) => boolean;
  deleteSave: (name: string) => void;
  listSaves: () => string[];
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
      props: {...NODE_REGISTRY[nodeType].defaultProps },
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
  moveNode: (draggedId, targetId) => {
    const { tree } = get();

    if(draggedId === targetId) return;
    const dragged = findNodeById(tree, draggedId);
    if (!dragged) return;

    if(findNodeById(dragged, targetId)) return;

    if(draggedId === tree.id) return;

    const withoutDragged = removeNode(tree, draggedId);
    const target = findNodeById(withoutDragged, targetId);
    if(!target) return;

    const newTree = NODE_REGISTRY[target.type].acceptsChildren
      ? insertNode(withoutDragged, targetId, dragged)
      : insertAfter(withoutDragged, targetId, dragged);
    
    set({ tree: newTree });
  },
  deleteNode: () => {
    const { tree, selectedNodeId } = get();
    if (!selectedNodeId) return;
    if (selectedNodeId === tree.id) return;
    const newTree = removeNode(tree, selectedNodeId);
    set({ tree: newTree, selectedNodeId: null });
  },
  resetTree: () => {
    set({ tree: initialTree, selectedNodeId: null });
  },
  dragOverId: null,
  setDragOverId: (id) => set({ dragOverId: id }),
  saveTree: (name) => {
    const { tree } = get();
    const raw = localStorage.getItem(SAVES_KEY);
    const saves = raw ? JSON.parse(raw) : {};
    saves[name] = tree;
    writeSaves(saves);
  },
  loadTree: (name) => {
    const saves = readSaves();
    const tree = saves[name];
    if (!tree) return false;
    set({ tree, selectedNodeId: null });
    return true;
  },
  listSaves: () => Object.keys(readSaves()),
  deleteSave: (name) => {
    const saves = readSaves();
    delete saves[name];
    writeSaves(saves);
  },
}));


