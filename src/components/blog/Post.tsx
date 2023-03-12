import type { PropsWithChildren } from "react";
import { Author } from "./Author";

export type PostProps = PropsWithChildren;

export const Post = ({ children }: PostProps) => {
  return (
    <div>
      <Author />
      <div>{children}</div>
    </div>
  );
};
