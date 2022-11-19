import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useGetMetadata } from "../../hooks/useGetMetadata";
import { Spinner } from "./Spinner";

export interface DesineCardProps {
  cadCid: string;
  metadataCid: string;
}

export const DesineCard = ({
  cadCid,
  metadataCid,
  ...props
}: DesineCardProps &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { metadata, metadataStatus, imageUrl, isImageUrlWrapped } =
    useGetMetadata(metadataCid);

  return (
    <div
      className="card lg:card-side w-full h-full bg-neutral shadow-2xl"
      {...props}
    >
      {(metadataStatus === "loading" || !imageUrl || !isImageUrlWrapped) && (
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
      {metadataStatus === "success" && !!imageUrl && isImageUrlWrapped && (
        <>
          <div className="overflow-hidden h-full w-full">
            <div
              style={{ backgroundImage: `url("${imageUrl}")` }}
              className="h-full w-full bg-cover bg-center hover:scale-110 overflow-hidden"
            />
          </div>
          <div className="card-body flex flex-col w-full">
            <h2 className="card-title">{metadata.name}</h2>
            <p>{metadata.description}</p>
          </div>
        </>
      )}
    </div>
  );
};
