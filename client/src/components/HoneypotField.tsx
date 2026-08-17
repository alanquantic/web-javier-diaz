import { useId } from "react";

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const HoneypotField: React.FC<HoneypotFieldProps> = ({ value, onChange }) => {
  const id = useId();

  return (
    <div className="hp-field" aria-hidden="true">
      <label htmlFor={id}>Sitio web de la empresa</label>
      <input
        id={id}
        name="company_website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
};

export default HoneypotField;
