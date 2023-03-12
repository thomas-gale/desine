import type { PropsWithChildren } from "react";
import { Author, AuthorProps } from "./Author";

export interface PostProps {
  authorProps: AuthorProps;
}

export const Post = ({
  authorProps,
  children,
}: PropsWithChildren<PostProps>) => {
  return (
    <div>
      <Author {...authorProps} />
      <div>{children}</div>
    </div>
  );
};
