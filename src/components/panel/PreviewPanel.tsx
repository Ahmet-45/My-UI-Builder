// src/components/panel/PreviewPanel.tsx
import { useBuilderStore } from '../../store/useBuilderStore';
import { exportToHTML } from '../../utils/htmlExporter';

export const previewPanel = () => {
  const tree = useBuilderStore(state => state.tree);

  const rawHTMLString = exportToHTML(tree);

  return (
    <div style={{ border: '2px dashed gray', padding: '20px', marginTop:'20px'}}>
      <h2>Preview Panel</h2>
      <div dangerouslySetInnerHTML={{ __html: rawHTMLString }} />
    </div>
  )
}