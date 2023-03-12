import Image from "next/image";

export interface AuthorProps {
  name: string;
  imageSrc: string;
}

export const Author = ({ name, imageSrc }: AuthorProps) => {
  return (
    <div className="flex flex-row">
      <div className="avatar">
        <div className="w-24 mask mask-hexagon">
          <Image
            alt={`Image of ${name}`}
            src={imageSrc}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h3>{name}</h3>
      </div>
    </div>
  );
};
