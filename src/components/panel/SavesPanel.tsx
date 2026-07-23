import { useState } from "react";
import { useBuilderStore } from "../../store/useBuilderStore";
import { ConfirmDialog } from "./ConfirmDialog";

export const SavesPanel = ({ onClose }: { onClose: () => void}) => {
  const listSaves = useBuilderStore(s => s.listSaves);
  const loadTree = useBuilderStore(s => s.loadTree);
  const deleteSave = useBuilderStore(s => s.deleteSave);

  const [names, setNames] = useState<string[]>(listSaves());
  const [hovered, setHovered] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<string | null>(null);

  const handleDelete = (name: string) => {
    if (!confirm(`"${name}" kaydını silmek istiyor musunuz?`)) return;
    deleteSave(name);
    setNames(listSaves());
  };

  return (
    <div onClick={onClose} style={{ 
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
      <div onClick={(e) => e.stopPropagation()} style={{ 
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        width: 400,
        maxHeight: '70hv',
        overflow: 'auto'
      }}>
        <h3>Kayitlar</h3>

        {names.length === 0 && <p>Henuz kayit yok.</p>}

        {names.map((name) => (
          <div
            key={name}
            onMouseEnter={() => setHovered(name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => { loadTree(name); onClose(); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: 8, cursor: 'pointer',
              backgroundColor: hovered === name ? '#f0f0f0' : 'transparent',
            }}
          >
            <span>{name}</span>
            {hovered === name && (
              <button onClick={(e) => { e.stopPropagation(); setConfirmTarget(name); }}>
                ✕
              </button>
            )}
            {confirmTarget && (
              <ConfirmDialog
                message={`"${confirmTarget}" kaydını silmek istiyor musunuz?`}
                onConfirm={() => {
                  deleteSave(confirmTarget);
                  setNames(listSaves());
                }}
                onClose={() => setConfirmTarget(null)}
              />  
            )}
          </div>
        ))}
      </div>
    </div>
  )
}