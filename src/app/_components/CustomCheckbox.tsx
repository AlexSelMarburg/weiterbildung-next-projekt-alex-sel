"use client";
type Props = {
  checked: boolean;
  onChecked: (checked: boolean) => void;
};

export default function CustomCheckbox({ checked, onChecked }: Props) {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id="_checkbox"
        checked={checked}
        onChange={() => onChecked(!checked)}
      />
      <label htmlFor="_checkbox">
        <div className="tick_mark"></div>
      </label>
    </div>
  );
}
