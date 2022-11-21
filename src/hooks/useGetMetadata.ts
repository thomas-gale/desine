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
      return data as Metadata;
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
