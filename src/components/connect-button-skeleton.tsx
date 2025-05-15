export default function ConnectButtonSkeleton() {
  return (
    <div className="flex items-center gap-x-2 bg-card border border-card-hover rounded-lg px-3 py-1 self-end w-[140px] h-[36px]">
      <div className="w-full h-3.5 bg-white/10 animate-pulse rounded" />
    </div>
  );
}
