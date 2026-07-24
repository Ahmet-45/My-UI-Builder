import { useState } from 'react';

export const SaveDialog = ({
  onConfirm,
  onClose,
}: {
  onConfirm: (name: string) => void;
  onClose: () => void;
}) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;        
    onConfirm(name.trim());
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff', padding: 20, borderRadius: 8, width: 360,
          display: 'flex', flexDirection: 'column', gap: 12,
        }}
      >
        <h3 style={{ margin: 0 }}>Kaydet</h3>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
            if (e.key === 'Escape') onClose();
          }}
          placeholder="Kayit ismi"
          style={{ padding: 8, border: '1px solid #ccc', borderRadius: 4 }}
        />

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose}>Iptal</button>
          <button onClick={handleSubmit} disabled={!name.trim()}>Kaydet</button>
        </div>
      </div>
    </div>
  );
};