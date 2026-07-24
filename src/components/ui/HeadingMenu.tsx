import { lazy, useState } from "react";
import { useBuilderStore } from "../../store/useBuilderStore";

export const HeadingMenu = () => {
  const addNode = useBuilderStore(s => s.addNode);
  const [open, setOpen] = useState(false);

  const HEADINGS = [
    {type: 'h1', label: 'Başlık 1', size: 28},
    {type: 'h2', label: 'Başlık 2', size: 22},
    {type: 'h3', label: 'Başlık 3', size: 18},
  ] as const;

  return (
    <div style={{ position: 'relative'}}>
      <button onClick={() => setOpen(v => !v)}>Başlık ▾</button>

      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 10,
          backgroundColor: '#fff', border: '1px solid #ccc',
          borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          minWidth: 140,
        }}>
          {HEADINGS.map(h => (
            <div
              key={h.type}
              onClick={() => { addNode(h.type); setOpen(false); }}
              style={{
                padding: '6px 12px',
                fontSize: h.size,
                cursor: 'pointer',
              }}
            >
              {h.label}
            </div>    
          ))}
        </div>  
      )}
    </div>
  );
};