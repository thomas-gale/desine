import { HTMLAttributes } from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

export interface ButtonProps {
  external: boolean;
  href?: string;
  iconSize?: string | number;
  download?: string;
}

/** Generic styled HTML button alternative */
export const Button = (
  props: ButtonProps & HTMLAttributes<HTMLAnchorElement>
): JSX.Element => {
  const { className, external, children, iconSize, download, ...restprops } =
    props;

  return (
    <a
      className={`btn ${className}`}
      target={external ? "_blank" : ""}
      rel="noopener noreferrer"
      download={download}
      {...restprops}
    >
      <div className="flex flex-row items-center space-x-2">
        <div>{children}</div>
        {external && <FaExternalLinkSquareAlt size={iconSize ?? "1em"} />}
      </div>
    </a>
  );
};
