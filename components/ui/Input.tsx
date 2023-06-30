import { useId } from "react";

const Input = ({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: any) => void;
  value: any;
}) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label className="text-neutral-300" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="self-stretch rounded-xl border border-neutral-800 bg-[#212121] px-3 py-2 text-sm text-neutral-400 duration-200 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-[#121212]"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default Input;
