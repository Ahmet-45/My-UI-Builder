// src/components/panel/InspectorPanel.tsx
import { useBuilderStore } from "../../store/useBuilderStore";
import { findNodeById } from "../../utils/treeHelpers";

export const InspectorPanel = () => {
  const tree = useBuilderStore((state) => state.tree);
  const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);

  const updateNode = useBuilderStore((state) => state.updateNode);

  if (!selectedNodeId) {
    return <div className="p-4">Lutfen tuvalden bir eleman secin</div>
  }

  const selectedNode = findNodeById(tree, selectedNodeId);

  if(!selectedNode) return null;

  return (
    <div className="p-4 border-l bg-gray-50 h-screen">
      <h3 className="font-bold mb-4">Özellikler (Props)</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Genislik (Width - px)</label>
        <input
          type="number"
          className="border p-1 w-full"
          value={selectedNode.props?.width || ""}
          onChange={(e) => {
            updateNode({ width: parseInt(e.target.value) || 0 })
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Arka Plan Rengi</label>
        <input
          type="color"
          className="border p-1 w-full"
          value={selectedNode.props?.backgroundColor || "#ffffff"}
          onChange={(e) => {
            updateNode({ backgroundColor: e.target.value })
          }}
        />
      </div>
    </div>
  );
};