import { useRef, useState } from "react";
import { useClickAway, useMeasure } from "react-use";
import { Metadata } from "../../../types/Metadata";
import { CADViewer } from "../../viewer/CADViewer";

export interface DesineCardPreviewProps {
  cadCid: string;
  imageUrl: string;
  metadata: Metadata;
}

export const DesineCardPreview = ({
  cadCid,
  imageUrl,
  metadata,
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
            className="overflow-hidden hover:scale-110"
            onClick={() => setPreviewMode("full")}
          >
            <img
              ref={previewContainerRef}
              src={imageUrl}
              alt={`Image of DesineToken ${cadCid}`}
              className="h-full w-full max-h-96 max-w-96 object-contain"
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
        <h2 className="card-title">{metadata.name}</h2>
        <p>{metadata.description}</p>
      </div>
    </>
  );
};
