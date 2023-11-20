import clsx from "clsx";

const StaticText = ({ isOpen, mode }) => {

  const textStyleContainer = clsx({
    "w-5/5": !isOpen,
    "w-5/5": isOpen,
    "top-15": true,
    "h-full": true,
    "p-16": true,
    "flex": true,
    "justify-center": true,
    "items-center": true
  });

  const textStyle = clsx({
    "text-justify": true,
    "font-normal": true,
    "text-2xl": true,
    "tracking-tight": true,
    "leading-9": true,
    "line-clamp-7": true,
    "text-gray-700": !mode,
    "text-white-400": mode,
    // "py-4": true,
    // "px-2": true,
    "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.2)",
    "rounded-md": true,
  });
  return (
    <div className={textStyleContainer}>
      <p className={textStyle}></p>
    </div>
  )
}

export default StaticText