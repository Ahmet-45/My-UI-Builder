export const ConfirmDialog = ({
  message,
  onConfirm,
  onClose,
}: {
  message: string;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  return (
    <div
      onClick={onClose}
      style={{ 
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
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
        <p style={{ margin: 0 }}>{message}</p>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose}>Hayir</button>
          <button onClick={() => { onConfirm(); onClose(); }}>Evet</button>
        </div>
      </div>
    </div>
  );
};