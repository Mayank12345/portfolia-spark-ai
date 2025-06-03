
const PortfolioLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="animate-spin h-16 w-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
          <div className="absolute inset-0 h-16 w-16 border-4 border-transparent border-t-blue-300 rounded-full mx-auto animate-ping"></div>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-medium text-slate-700">Generating portfolio...</p>
          <p className="text-slate-500">This will just take a moment</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioLoading;
