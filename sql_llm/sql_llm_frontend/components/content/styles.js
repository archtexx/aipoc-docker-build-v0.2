// styles.js

import clsx from 'clsx';

export const chatBoxColor = (mode) => clsx({
  "shadow-md": true,
  "w-full": true,
  "my-4": true,
  "rounded-2xl": true,
  'relative': true,
  "bg-gray-600": mode,
  "bg-gray-200": !mode,
  // "max-h-[80vh]": true,
  "h-[85vh]":true,
  "flex": true,
  "flex-col": true,
  'overflow-hidden': true,
  "shadow shadow-white":true,
});

export const msgStyle = (mode) => clsx({
  "flex": true,
  "flex-row": true,
  "items-center": true,
  "text-white": mode,
  "bg-gray-600": mode,
  "text-black": !mode,
  "bg-gray-200": !mode,
  "py-4": true,
  "px-4": true,
});

export const inputStyle = (mode) => clsx({
  "rounded-lg": true,
  "w-4/5": true,
  "border": true,
  "p-4": true,
  "bg-gray-800": mode,
  "bg-light": !mode,
  "border-1": !mode,
  "border-black": !mode,
  "shadow-sm shadow-white":true,
  "h-10": true
});

export const sendButtonStyle = (mode) => clsx({
  "flex": true,
  "justify-center": true,
  "items-center": true,
  "h-10": true,
  "w-10": true,
  "rounded-lg": true,
  "hover:bg-gray-800": mode,
  "active:bg-gray-900": mode,
  "hover:bg-gray-300": !mode,
  "active:bg-gray-400": !mode,
});

export const replyContainerStyle = (mode) => clsx({
  "bg-gray-700": mode,
  "bg-gray-300": !mode,
  "rounded-full": true,
});

export const replyTextStyle = (mode) => clsx({
  "rounded-lg": true,
  "bg-gray-700": mode,
  "bg-gray-300": !mode,
  "mb-[10px]": true,
  "p-4": true,
  "flex": true,
  "flex-row": true,
  "w-full": true
});

export const collapsableContent = (mode) => clsx({
  "bg-gray-700": mode,
  "bg-gray-400": !mode,
  "m-4": true,


});

export const collapseablebtn = (mode) => clsx({
  "rounded-full": true,
  "h-[25px]": true,
  "w-[25px]": true,
  "inline-flex": true,
  "items-center": true,
  "justify-center": true,
  "text-violet11": true,
  "outline-none": true,
  "data-[state=closed]:bg-gray-700": mode,
  "data-[state=closed]:bg-gray-400": !mode,
  "data-[state=open]:bg-violet3": true,
  "hover:bg-violet3": true
});
