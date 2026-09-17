export default function LogoHeader({ className = 'mb-16' }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div className="flex gap-1">
        <div className="w-1 h-5 bg-primary rounded-full" />
        <div className="w-1 h-7 bg-blue-500 rounded-full" />
        <div className="w-1 h-4 bg-primary rounded-full" />
      </div>
      <span className="font-bold text-xl">Nuzio <span className="text-primary text-xs align-top">AI</span></span>
    </div>
  );
}
