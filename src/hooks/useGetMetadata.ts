import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { Metadata } from "../types/Metadata";
import { useWrapIpfsGateway } from "./useWrapIpfsGateway";

export const useGetMetadata = (cid: string) => {
  const [metadataUrl, isMetadataUrlWrapped] = useWrapIpfsGateway(cid);
  const { data: metadata, status: metadataStatus } = useQuery(
    [cid],
    async () => {
      console.log(`1. GetMetadata: downloading ${metadataUrl}...`);
      let response = await fetch(metadataUrl);
      let data = await response.json();
      console.log("1. GetMetadata: downloaded json!");
      const metadata = data as Metadata;
      // TODO, thoroughly sanitize data
      metadata.name = metadata.description.slice(0, 100); // To check
      metadata.description = metadata.description.slice(0, 300); // To check
      metadata.attributes = metadata.attributes.slice(0, 3); // To check
      return metadata;
    },
    {
      enabled: isMetadataUrlWrapped && !!cid,
    }
  );

  const imageCid = useMemo(() => {
    if (!metadata) return "";
    return metadata.image.split("/").pop();
  }, [metadata]);

  const [imageUrl, isImageUrlWrapped] = useWrapIpfsGateway(imageCid as string);

  return { metadata, metadataStatus, imageUrl, isImageUrlWrapped };
};
