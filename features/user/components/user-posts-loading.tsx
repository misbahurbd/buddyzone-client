import { ScaleLoader as Spinner } from "react-spinners";

export const UserPostsLoading = () => {
  return (
    <div className="flex items-center gap-2 justify-center py-4">
      <Spinner barCount={3} height={16} width={2} margin={1} color="#AAA" />
      <span className="text-gray-500 text-sm">Loading posts...</span>
    </div>
  );
};

