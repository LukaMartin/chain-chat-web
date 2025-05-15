export default function MessageCardSkeleton() {
  return (
    <div className="h-[100px] flex justify-between bg-card border border-card-hover p-4 rounded-lg gap-x-6 lg:gap-x-10">
      <div className="flex flex-col gap-y-0.5">
        <div className="h-4 w-24 bg-white/10 rounded animate-pulse" />
        <div className="flex flex-col gap-y-2 mt-2">
          <div className="h-4 w-[280px] bg-white/10 rounded animate-pulse" />
          <div className="h-4 w-[200px] bg-white/10 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className="h-4 w-20 bg-white/10 rounded animate-pulse self-end" />
        <div className="flex items-center gap-x-2">
          <div className="h-[32px] w-[32px] bg-white/10 rounded-lg animate-pulse" />
          <div className="h-[32px] w-[32px] bg-white/10 rounded-lg animate-pulse" />
          <div className="h-[32px] w-[32px] bg-white/10 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
