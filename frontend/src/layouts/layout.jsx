import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="w-full max-w-[430px] h-[100dvh] sm:border-[7px] border-zinc-800 sm:rounded-[3rem] overflow-hidden bg-background relative shadow-2xl flex flex-col">
      <div className="flex-1 overflow-y-auto relative bg-background custom-scrollbar [&>div]:min-h-full">
        <Outlet />
      </div>
    </div>
  );
}