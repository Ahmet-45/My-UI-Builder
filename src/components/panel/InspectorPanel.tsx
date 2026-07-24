// src/components/panel/InspectorPanel.tsx
import { useBuilderStore } from "../../store/useBuilderStore";
import { NodeProps, NodeType } from "../../types/builder";
import { findNodeById } from "../../utils/treeHelpers";
import { UnitSelect } from "../ui/UnitSelect";

type FieldDef = {
  key: keyof NodeProps;
  label: string;
  type: 'number' | 'color' | 'text' | 'select';
  options?: readonly string[];
  only?: readonly NodeType[];
  unitKey?: keyof NodeProps;
  unitOptions?: readonly string[];
}
const TEXT_TYPES: NodeType[] = ['button', 'text', 'input', 'h1', 'h2', 'h3']
const FIELDS: readonly FieldDef[] = [
  { key: 'width',           label: 'Genislik(px)',    type: 'number', unitKey: 'widthUnit', unitOptions: ['px', '%', 'vw'] },
  { key: 'height',          label: 'Yukseklik (px)',  type: 'number', unitKey: 'heightUnit', unitOptions: ['px', '%', 'vh'] },
  { key: 'padding',         label: 'Ic Bosluk (px)',  type: 'number' },
  { key: 'margin',          label: 'Dis Bosluk (px)', type: 'number' },
  { key: 'borderRadius',    label: 'Kose Yuvarlak',   type: 'number' },
  { key: 'backgroundColor', label: 'Arka Plan',       type: 'color'  },
  { key: 'display',         label: 'Display',         type: 'select', options: ['block', 'flex'], only: ['container'] },
  { key: 'flexDirection',   label: 'Yon',  type: 'select', options: ['row', 'column'], only: ['container'] },
  { key: 'justifyContent',  label: 'Yatay Hizala',    type: 'select', options: ['flex-start', 'center', 'flex-end', 'space-between'], only: ['container'] },
  { key: 'alignItems',      label: 'Dikey Hizala',    type: 'select', options:['flex-start', 'center', 'flex-end'], only: ['container'] },
  { key: 'gap',             label: 'Gap',             type: 'number', only: ['container'] },
  { key: 'flexShrink',      label: 'Buzulme (shrink)',type: 'select', options: ['0', '1']},
  { key: 'overflow',        label: 'Tasma(overflow)', type: 'select', options: ['visible', 'hidden', 'auto', 'scroll'], only: ['container']},
  { key: 'text',            label: 'Metin',           type: 'text', only: TEXT_TYPES },
  { key: 'color',           label: 'Yazı Rengi',      type: 'color', only: TEXT_TYPES},
  { key: 'fontSize',        label: 'Yazı Boyutu',     type: 'number', only: TEXT_TYPES},
  { key: 'textAlign',       label: 'Yazı Hizası',     type: 'select', options: ['left', 'center', 'right'], only: TEXT_TYPES},
  { key: 'overflowWrap',    label: 'Kelime Kaydır',   type: 'select', options: ['normal', 'break-word'], only: TEXT_TYPES},
  { key: 'wordBreak',       label: 'Kelime Kır',      type: 'select', options: ['normal', 'break-all'],  only: TEXT_TYPES},
];

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
      { FIELDS
        .filter(f => !f.only || f.only.includes(selectedNode.type))
        .map((field) => (
          <div key={field.key} style={{marginBottom: 16}}>
            <label style={{display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 4}}>{field.label}</label>
            {field.type === 'select' ? (
              <select 
                style={{ border: '1px solid #ccc', padding: 4, width: '100%', boxSizing: 'border-box'}}
                value={selectedNode.props?.[field.key] ?? ''}
                onChange={(e) => updateNode(selectedNode.id, { [field.key]: e.target.value })}
              >
                <option value="">-- sec --</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>  
            ) : (
              <div style={{ display: 'flex', gap: 4 }}>
                <input
                  type={field.type}
                  style={{ flex: 1, border: '1px solid #ccc', padding: 4, boxSizing: 'border-box' }}
                  value={selectedNode.props?.[field.key] ?? (field.type === 'color' ? '#ffffff' : '')}
                  onChange={(e) => {
                    const raw = e.target.value;
                    updateNode(selectedNode.id, {
                      [field.key]: field.type === 'number'
                        ? (raw === '' ? undefined : parseInt(raw))
                        : raw
                    });
                  }}
                />

                {field.unitKey && field.unitOptions && (
                  <UnitSelect
                    value={String(selectedNode.props?.[field.unitKey] ?? field.unitOptions[0])}
                    options={field.unitOptions}
                    onChange={(unit) => updateNode(selectedNode.id, { [field.unitKey!]: unit })}
                  />
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
};