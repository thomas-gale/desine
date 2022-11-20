import {
  DetailedHTMLProps,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useClickAway } from "react-use";
import { useGetMetadata } from "../../hooks/useGetMetadata";
import { CADViewer } from "../viewer/CADViewer";
import { Spinner } from "./Spinner";

export interface DesineCardProps {
  cadCid: string;
  metadataCid: string;
  onLoading?: () => void;
  onSuccessfullyLoaded?: () => void;
}

export const DesineCard = ({
  cadCid,
  metadataCid,
  onLoading,
  onSuccessfullyLoaded,
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
  }, [loading]);

  useEffect(() => {
    if (successfullyLoaded && onSuccessfullyLoaded) {
      onSuccessfullyLoaded();
    }
  }, [successfullyLoaded]);

  const [previewMode, setPreviewMode] = useState<"preview" | "full">("preview");
  const ref = useRef(null);
  useClickAway(ref, () => {
    setPreviewMode("preview");
  });

  return (
    <div
      className="card lg:card-side w-full h-full bg-neutral shadow-2xl overflow-hidden"
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
      {successfullyLoaded && (
        <>
          {previewMode === "preview" && (
            <div className="overflow-hidden h-full w-full">
              <div
                style={{ backgroundImage: `url("${imageUrl}")` }}
                className="h-full w-full bg-cover bg-center hover:scale-110 overflow-hidden"
                onClick={() => setPreviewMode("full")}
              />
            </div>
          )}
          {previewMode === "full" && (
            <div ref={ref} className="h-full w-full">
              <CADViewer stepURL={cadCid} />
            </div>
          )}
          <div className="card-body flex flex-col w-full">
            <h2 className="card-title">{metadata.name}</h2>
            <p>{metadata.description}</p>
          </div>
        </>
      )}
    </div>
  );
};
