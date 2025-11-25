export const UserProfileLoading = () => {
  return (
    <div className="bg-bg2 rounded-lg p-6 w-full flex flex-col items-center gap-6 animate-pulse">
      <div className="size-32 rounded-full bg-gray-300" />
      <div className="flex flex-col items-center gap-2">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="h-4 w-32 bg-gray-300 rounded" />
      </div>
    </div>
  );
};
