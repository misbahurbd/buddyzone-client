import { SearchIcon } from "@/assets/icons/search";

export const SearchBox = () => {
  return (
    <div className="w-[424px] relative">
      <SearchIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2 text-color4" />
      <input
        className="w-full h-10 transition-all px-12 py-2 bg-bg3 rounded-full border border-bg3 outline-none focus:border-color5 focus:bg-bg2 placeholder:text-color3"
        placeholder="input search text"
      />
    </div>
  );
};
