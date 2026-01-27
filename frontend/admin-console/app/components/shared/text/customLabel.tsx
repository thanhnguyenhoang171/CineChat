export function CustomLabel({
  text,
  icon,
}: {
  text: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className='text-xs font-medium uppercase tracking-wide text-slate-500 flex items-center gap-2'>
      {icon} {text}
    </label>
  );
}
