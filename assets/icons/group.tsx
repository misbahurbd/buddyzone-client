export const GroupIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        stroke="currentColor"
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
      ></path>
      <circle cx="9" cy="7" r="4" stroke="currentColor"></circle>
      <path stroke="currentColor" d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path stroke="currentColor" d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
};
