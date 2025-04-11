const UnderlinedText = ({ children, color = "text-red-500" }) => {
  return (
    <div className="relative inline-block">
      <span className={`relative z-10 font-bold text-gray-900 pb-1`}>{children}</span>
      <svg
        className={`absolute left-0 bottom-0 w-full ${color} animate-draw`}
        width="207"
        height="18"
        viewBox="0 0 207 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 10.4291C45.3333 5.42912 144.8 -2.07088 204 7.92912"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-dasharray-[200] stroke-dashoffset-[200] animate-underline"
        />
      </svg>
    </div>
  );
};

export default UnderlinedText;
