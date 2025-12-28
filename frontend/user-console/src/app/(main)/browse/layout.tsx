export default function BrowseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="browse-layout">
      {children}
    </div>
  );
}
