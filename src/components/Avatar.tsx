import Image from "next/image";

type AvatarProps = {
  img: string;
  alt?: string;
};

const Avatar = ({ img, alt }: AvatarProps) => {
  return (
    <div className="rounded-full overflow-hidden w-full pt-[100%] relative">
      <div className="absolute inset-0">
        <Image src={img} alt={alt || img} width={25} height={25} />
      </div>
    </div>
  );
};

export default Avatar;
