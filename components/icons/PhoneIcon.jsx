export const PhoneIcon = ({ color }) => {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 62 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M45.3906 19.6526L41.3244 15.5903C41.0376 15.3022 40.6967 15.0736 40.3212 14.9176C39.9458 14.7617 39.5432 14.6815 39.1367 14.6816C38.3082 14.6816 37.5293 15.0061 36.9452 15.5903L32.5697 19.9657C32.2816 20.2526 32.053 20.5935 31.8971 20.9689C31.7411 21.3444 31.6609 21.7469 31.661 22.1535C31.661 22.982 31.9856 23.7608 32.5697 24.345L35.7692 27.5445C35.0203 29.1953 33.979 30.697 32.6957 31.9772C31.4156 33.2637 29.914 34.3087 28.263 35.0622L25.0635 31.8627C24.7766 31.5746 24.4357 31.346 24.0603 31.1901C23.6848 31.0341 23.2823 30.9539 22.8757 30.954C22.0472 30.954 21.2684 31.2785 20.6842 31.8627L16.3049 36.2343C16.0165 36.5217 15.7877 36.8632 15.6318 37.2394C15.4758 37.6155 15.3958 38.0187 15.3962 38.4259C15.3962 39.2544 15.7208 40.0333 16.3049 40.6174L20.3635 44.676C21.2951 45.6114 22.5818 46.1421 23.9028 46.1421C24.1815 46.1421 24.4488 46.1192 24.7122 46.0734C29.8589 45.2258 34.9636 42.4882 39.0833 38.3724C43.1991 34.2604 45.9328 29.1595 46.7918 23.9976C47.0515 22.4207 46.5284 20.7981 45.3906 19.6526Z"
        fill={color || '#DB0380'}
      />
      <rect
        x="1.71466"
        y="1"
        width="58.8237"
        height="58.8237"
        rx="8"
        stroke={color || '#DB0380'}
        strokeWidth="2"
      />
    </svg>
  );
};
