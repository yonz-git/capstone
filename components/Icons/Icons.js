import React from "react";

// icons for the form

const icons = {
  birthday: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 48 48"
    >
      <path d="M0 0h48v48H0z" fill="none" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.33 15.16c-7.33.75-12.78 3.67-12.78 7.17c0 4.06 7.37 7.35 16.45 7.35s16.45-3.29 16.45-7.35c0-3.5-5.46-6.42-12.78-7.17"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.55 26.41c0 1.44.38 3.55 2 4.69c1.14.81 3.46-.17 5.2.38c1.42.46 2.59 2.66 4.3 2.9c1.53.21 3.29-1.57 5-1.57s3.43 1.78 5 1.57c1.71-.24 2.89-2.44 4.31-2.89c1.74-.56 4.06.42 5.2-.39c1.6-1.14 2-3.25 2-4.69"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.55 22.33v13.44c0 4.06 7.37 7.35 16.45 7.35s16.45-3.29 16.45-7.35V22.33"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.33 14.15v8.18C20.33 23.23 22 24 24 24s3.67-.74 3.67-1.64v-8.21"
      />
      <ellipse
        cx="24"
        cy="14.15"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        rx="3.67"
        ry="1.64"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24 14.15c0-.9-1.05-2.1-1.05-2.86m.05 0c-.26-.77-1.75-.7-1.75-2.77s1.41-2.7 1.41-4.4a4 4 0 0 1 2.18 3.7A3.9 3.9 0 0 1 23 11.29"
      />
    </svg>
  ),
  clock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 48 48"
    >
      <path d="M0 0h48v48H0z" fill="none" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24 2.5A21.5 21.5 0 1 1 2.5 24A21.51 21.51 0 0 1 24 2.5"
      />
      <circle
        cx="24"
        cy="24"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M24 21.5V11.44m2.1 13.91l12.2 7.8"
      />
    </svg>
  ),
  earth: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 48 48"
    >
      <circle
        cx="24"
        cy="24"
        r="21.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.238 3.944l2.035 1.615l4.267.82l-.689 2.236l-2.422.838l-2.218 3.578l-3.615 2.236l-5.068.671l-.112 2.012l1.621 1.752l-.112 2.963l-4.509-3.075l-1.302-3.777"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.435 24.192l3.671-3.763l1.509 2.683l5.087.354l2.385 3.615h3.037l-.838 3.782l-2.87 2.702l-.037 2.18l-3 2.274l.093 3.764l-2.515-.932l-1.268-3.596l.056-7.379l-3.82-.69l-1.49-2.925zm33.094 12.26l-2.237-1.519l-1.453-2.952l-2.814-4.959l-.093-3.242l-2.18-1.391l-3.112-.172l-5.125-2.229l-.819-4.926l2.198-2.329h4.51l1.621 2.068l6.335.485l4.456-1.697M39.67 9.28l-2.335 1.459l-3.689-.671l-2.255-1.08l-2.981.913l-2.162-.615l1.435-3.168l2.59.13l3.125-1.59M20.34 45.189l4.12-2.214l3.851-.261l2.757-.708l3.299.834"
      />
    </svg>
  ),
};

export default function CosmicIcon({ name }) {
  const selectedIcon = icons[name];

  return <span role="img">{selectedIcon}</span>;
}
