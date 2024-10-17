interface BelowHeaderProps {
  children: React.ReactNode;
}

export default function BelowHeader({ children }: BelowHeaderProps) {
  return <div className="mt-4 text-sm text-gray-700 space-y-2">{children}</div>;
}
