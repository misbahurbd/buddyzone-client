export const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill="none"
      viewBox="0 0 17 17"
      {...props}
    >
      <circle cx="7" cy="7" r="6" stroke="currentColor"></circle>
      <path stroke="currentColor" strokeLinecap="round" d="M16 16l-3-3"></path>
    </svg>
  );
};
