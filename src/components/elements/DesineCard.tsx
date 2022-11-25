import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClickAway, useMeasure } from "react-use";
import { useGetMetadata } from "../../hooks/useGetMetadata";
import { CADViewer } from "../viewer/CADViewer";
import { DesineCardPreview } from "./desine-card/DesineCardPreview";
import { Spinner } from "./Spinner";

export interface DesineCardProps {
  cadCid: string;
  metadataCid: string;
  onLoading?: () => void;
  onSuccessfullyLoaded?: () => void;
  noLink?: boolean;
}

export const DesineCard = ({
  cadCid,
  metadataCid,
  onLoading,
  onSuccessfullyLoaded,
  noLink,
  ...props
}: DesineCardProps &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { metadata, metadataStatus, imageUrl, isImageUrlWrapped } =
    useGetMetadata(metadataCid);

  const loading = useMemo(
    () => metadataStatus === "loading" || !imageUrl || !isImageUrlWrapped,
    [metadataStatus, imageUrl, isImageUrlWrapped]
  );

  const successfullyLoaded = useMemo(
    () => metadataStatus === "success" && !!imageUrl && isImageUrlWrapped,
    [metadataStatus, imageUrl, isImageUrlWrapped]
  );

  useEffect(() => {
    if (loading && onLoading) {
      onLoading();
    }
  }, [loading, onLoading]);

  useEffect(() => {
    if (successfullyLoaded && onSuccessfullyLoaded) {
      onSuccessfullyLoaded();
    }
  }, [onSuccessfullyLoaded, successfullyLoaded]);

  return (
    <div
      className="card lg:card-side bg-neutral shadow-2xl overflow-hidden"
      {...props}
    >
      {loading && (
        <div className="h-full w-full flex items-center justify-center space-x-2">
          <div className="flex h-16 w-16">
            <Spinner />
          </div>
          <div className="flex flex-shrink flex-col max-w-md space-y-2">
            <h3 className="">
              Checking and downloading metadata.json from IPFS via configured
              gateway...
            </h3>
          </div>
        </div>
      )}
      {metadataStatus === "error" && (
        <div className="h-full w-full flex items-center justify-center">
          <div className="items-center justify-center">
            <h3 className="text-error">Failed to load metadata</h3>
          </div>
        </div>
      )}
      {successfullyLoaded && !!metadata && (
        <DesineCardPreview
          cadCid={cadCid}
          imageUrl={imageUrl}
          metadata={metadata}
          noLink={noLink}
        />
      )}
    </div>
  );
};
