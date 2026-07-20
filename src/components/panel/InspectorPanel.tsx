// src/components/panel/InspectorPanel.tsx
import { useBuilderStore } from "../../store/useBuilderStore";
import { findNodeById } from "../../utils/treeHelpers";


const FIELDS = [
  { key: 'width',           label: 'Genislik(px)',    type: 'number' },
  { key: 'height',          label: 'Yukseklik (px)',  type: 'number' },
  { key: 'padding',         label: 'Ic Bosluk (px)',  type: 'number' },
  { key: 'margin',          label: 'Dis Bosluk (px)', type: 'number' },
  { key: 'borderRadius',    label: 'Kose Yuvarlak',   type: 'number' },
  { key: 'backgroundColor', label: 'Arka Plan',       type: 'color'  },
  { key: 'display',         label: 'Display',         type: 'select', options: ['block', 'flex'] },
  { key: 'flexDirection',   label: 'Yon',  type: 'select', options: ['row', 'column'] },
  { key: 'justifyContent',  label: 'Yatay Hizala', type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between'] },
  { key: 'alignItems',      label: 'Dikey Hizala',     type: 'select', options:['flex-start', 'center', 'flex-end'] },
  { key: 'gap',             label: 'Gap',             type: 'number' },
  { key: 'flexShrink',      label: 'Buzulme (shrink)', type: 'select', options: ['0', '1']},
  { key: 'overflow', label: 'Tasma(overflow)', type: 'select', options: ['visible', 'hidden', 'auto', 'scroll']},
] as const;

export const InspectorPanel = () => {
  const selectedNode = useBuilderStore(s =>
  s.selectedNodeId ? findNodeById(s.tree, s.selectedNodeId) : null
  );
  const updateNode = useBuilderStore(s => s.updateNode);

  if (!selectedNode) {
  return <div className="p-4">Lutfen tuvalden bir eleman secin</div>;
  }

  return (
    <div style={{padding: '16px', borderLeft: '1px solid #ddd', backgroundColor: '#f9f9f9', height: '100vh'}}>
      <h3 style={{fontWeight: 'bold,', marginBottom: 16}}>Özellikler (Props)</h3>
      { FIELDS.map((field) => (
        <div key={field.key} style={{marginBottom: 16}}>
          <label style={{display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4}}>{field.label}</label>
          {field.type === 'select' ? (
            <select 
              style={{ border: '1px solid #ccc', padding: 4, width: '100%', boxSizing: 'border-box'}}
              value={selectedNode.props?.[field.key] ?? ''}
              onChange={(e) => updateNode({ [field.key]: e.target.value })}
            >
              <option value="">-- sec --</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>  
          ) : (
            <input 
              type={field.type}
              style={{ border: '1px solid #ccc', padding: 4, width: '100%', boxSizing: 'border-box'}}
              value={selectedNode.props?.[field.key] ?? (field.type === 'number' ? '' : '#ffffff')}
              onChange={(e) => 
                updateNode({
                  [field.key]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value
                })
              }
            />  
          )} 
        </div>
      ))}      
    </div>
  );
};