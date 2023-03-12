import React from "react";
import { FirstPost } from "../components/blog/posts/FirstPost";

const Blog = (): JSX.Element => {
  return (
    <div className="flex flex-col h-full overflow-scroll">
      <FirstPost />
    </div>
  );
};

export default Blog;
