import { useRef, useState } from "react";
import { useClickAway, useMeasure } from "react-use";
import { Metadata } from "../../../types/Metadata";
import { CADViewer } from "../../viewer/CADViewer";
import { Button } from "../Button";

export interface DesineCardPreviewProps {
  cadCid: string;
  imageUrl: string;
  metadata: Metadata;
  noLink?: boolean;
}

export const DesineCardPreview = ({
  cadCid,
  imageUrl,
  metadata,
  noLink,
}: DesineCardPreviewProps) => {
  const [previewMode, setPreviewMode] = useState<"preview" | "full">("preview");
  const imageContainerRef = useRef(null);
  useClickAway(imageContainerRef, () => {
    setPreviewMode("preview");
  });

  const [previewContainerRef, { width, height }] =
    useMeasure<HTMLImageElement>();

  return (
    <>
      {previewMode === "preview" && (
        <div className="overflow-hidden">
          <div
            className="h-full w-full overflow-hidden hover:scale-110"
            onClick={() => setPreviewMode("full")}
          >
            <img
              ref={previewContainerRef}
              src={imageUrl}
              alt={`Image of DesineToken ${cadCid}`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}
      {previewMode === "full" && (
        <div
          ref={imageContainerRef}
          style={{
            minWidth: width,
            minHeight: height,
          }}
        >
          <CADViewer stepURL={cadCid} />
        </div>
      )}
      <div className="card-body flex flex-col">
        {!!noLink ? (
          <h2 className="card-title">{metadata.name}</h2>
        ) : (
          <a href={!!noLink ? "" : `/browse/item?cid=${cadCid}`}>
            <h2 className="card-title">{metadata.name}</h2>
          </a>
        )}
        <p>{metadata.description}</p>
        <div className="flex flex-wrap">
          {metadata.attributes.map(({ value }) => (
            <div className="m-1 badge badge-secondary p">{value}</div>
          ))}
        </div>
      </div>
    </>
  );
};
