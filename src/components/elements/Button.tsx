import { AnchorHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

export interface ButtonProps {
  external: boolean;
  href?: string;
  iconSize?: string | number;
  disabled?: boolean;
}

/** Generic styled HTML button alternative */
export const Button = (
  props: ButtonProps &
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
): JSX.Element => {
  const { className, external, children, iconSize, disabled, ...restprops } =
    props;

  return (
    <a
      className={`btn${disabled ? " btn-disabled": ""} ${className}`}
      target={external ? "_blank" : ""}
      rel="noopener noreferrer"
      aria-disabled={disabled}
      {...restprops}
    >
      <div className="flex flex-row items-center space-x-2">
        <div>{children}</div>
        {external && <FaExternalLinkSquareAlt size={iconSize ?? "1em"} />}
      </div>
    </a>
  );
};
