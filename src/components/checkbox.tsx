type Props = {
  label: String
  value: boolean
  onChange: any
}
const Checkbox = ({ label, value, onChange }: Props) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
export default Checkbox
