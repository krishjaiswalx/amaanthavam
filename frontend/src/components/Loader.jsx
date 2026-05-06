export default function Loader() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary animation-delay-200"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary animation-delay-400"></div>
    </div>
  );
}
