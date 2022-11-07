import { HTMLAttributes } from "react";

export interface ButtonProps {
  mode: "dark" | "light";
  href?: string;
}

/** Generic styled HTML button alternative */
export const Button = (
  props: ButtonProps & HTMLAttributes<HTMLAnchorElement>
): JSX.Element => {
  const { mode, className, ...restprops } = props;

  return (
    <a
      className={`pointer-events-auto p-2 ${
        mode === "dark" ? "bg-light text-dark" : "bg-dark text-light"
      } font-artifakt font-bold rounded-xl hover:cursor-pointer hover:ring-gray-500 hover:ring-2 disabled:hover:ring-0 disabled:bg-gray-500 ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      {...restprops}
    />
  );
};
