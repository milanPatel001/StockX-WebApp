export default function Skeleton() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-screen h-screen">
      <div className="h-20 w-full motion-safe:animate-pulse bg-slate-200 rounded"></div>

      <div className="flex mt-10 w-full gap-4 justify-center">
        <div className="w-52 h-16 motion-safe:animate-pulse bg-slate-200  rounded"></div>
        <div className="w-52 h-16 motion-safe:animate-pulse bg-slate-200  rounded"></div>
        <div className="w-52 h-16 motion-safe:animate-pulse bg-slate-200  rounded"></div>
        <div className="w-52 h-16 motion-safe:animate-pulse bg-slate-200  rounded"></div>
        <div className="w-52 h-16 motion-safe:animate-pulse bg-slate-200  rounded"></div>
      </div>

      <div className="rounded-xl flex flex-col gap-5 mt-10 w-3/4 h-full mx-auto motion-safe:animate-pulse bg-slate-200"></div>
    </div>
  );
}
