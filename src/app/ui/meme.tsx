import Image from "next/image";

interface MemeType {
  name: string;
  url: string;
  height: number;
  width: number;
}

interface MemeProps {
  meme: MemeType;
  showMeme: boolean;
  setShowMeme: (show: boolean) => void;
}

export default function Meme({ meme, setShowMeme }: MemeProps) {
  const { name, url, height, width } = meme;
  return (
    <div className="flex flex-col place-content-center self-center m-8 p-4 w-full border-t-2">
      <p className="text-center font-bold text text-2xl">A meme for you</p>
      <div className="flex flex-col place-content-center self-center m-8 p-4 border border-black rounded-lg shadow-lg ">
        <button
          className="self-end font-bold text-2xl pr-4"
          onClick={() => {
            setShowMeme(false);
          }}
        >
          x
        </button>
        <p className="m-2 p-2 text-center text-xl font-bold">{name}</p>

        <Image
          src={url}
          alt={name}
          height={height}
          width={width}
          className="m-4 p-4 "
        />
      </div>
    </div>
  );
}
