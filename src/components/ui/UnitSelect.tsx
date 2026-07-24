
export const UnitSelect = ({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (unit: string) => void;
}) => {
  return (
    <select 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: 60,
        border: '1px solid #ccc',
        padding: 4,
        borderRadius: 4,
      }}
    >
      {options.map((u) => (
        <option key={u} value={u}>{u}</option>
      ))}
    </select>  
  );
};