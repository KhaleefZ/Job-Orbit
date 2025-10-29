import { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      {...props}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0080ff" />
          <stop offset="100%" stopColor="#ff63a1" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#logo-gradient)" />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        JO
      </text>
    </svg>
  );
}
