import { useBuilderStore } from "../../store/useBuilderStore";
import { exportFullPage } from "../../utils/htmlExporter";
import { useState } from "react";

export const ExportPanel = ({ onClose }: { onClose: () => void }) => {
  const tree = useBuilderStore(s => s.tree);
  const html = exportFullPage(tree);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
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
          backgroundColor: '#fff', padding: 20, borderRadius: 8,
          width: '80%', maxWidth: 800, maxHeight: '80vh',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <h3 style={{ margin: 0, flex: 1 }}>Export</h3>
          <button onClick={handleCopy}>Kopyala</button>
          { copied && <span style={{ color: 'green', fontSize: 13 }}>Kopyalandı</span> }
          <button onClick={handleDownload}>İndir</button>
          <button onClick={onClose}>Kapat</button>
        </div>

        <textarea
          readOnly
          value={html}
          style={{
            flex: 1, minHeight: 300, fontFamily: 'monospace',
            fontSize: 12, padding: 8, border: '1px solid #ccc',
          }}
        />
      </div>    
    </div>  
  );
};