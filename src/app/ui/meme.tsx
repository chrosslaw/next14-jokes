export default function Meme({ meme, showMeme, setShowMeme }) {
  const { name, url, height, width } = meme;
  return (
    <div className="flex flex-col place-content-center m-8 p-4 border border-black rounded-lg shadow-lg">
      <button
        className="border bg-yellow-50 border-black rounded-full hover:border-gray-400 shadow-md hover:shadow-xl px-1 text-center self-end"
        onClick={() => {
          setShowMeme(false);
        }}
      >
        x
      </button>
      <p className="m-2 p-2 text-center text-xl font-bold">{name}</p>
      <a href="#" className="self-center">
        <img
          src={url}
          alt={name}
          height={height}
          width={width}
          className="m-4 p-4 "
        />
      </a>
    </div>
  );
}
