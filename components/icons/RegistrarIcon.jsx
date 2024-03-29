import React from 'react';

export const RegistrarIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="90"
      height="90"
      viewBox="0 0 512 512"
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="100%"
        height="100%"
        fill="none"
        stroke="#DB0380"
        strokeWidth="20"
        rx="60"
      />
      <path
        fill="#DB0380"
        fillRule="evenodd"
        d="M192 368c0-75.617 47.937-140.243 115.016-165.1 8.14-18.269 12.984-38.582 12.984-58.9 0-79.529 0-144-96-144s-96 64.471-96 144c0 49.53 28.751 99.052 64 118.916v26.39c-108.551 8.874-192 62.21-192 126.694h198.653c-4.332-15.265-6.653-31.366-6.653-48z"
      ></path>
      <path
        fill="#DB0380"
        d="M368 224c-79.529 0-144 64.471-144 144s64.471 144 144 144c79.528 0 144-64.471 144-144s-64.471-144-144-144zM448 384h-64v64h-32v-64h-64v-32h64v-64h32v64h64v32z"
      ></path>
    </svg>
  );
};
