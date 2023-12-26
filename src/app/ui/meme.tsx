export default function Meme({ meme, showMeme, setShowMeme }) {
  const { name, url, height, width } = meme;
  return (
    <div className="flex flex-col place-content-center self-center m-8 p-4 w-full border-t-2">
      <p className="text-center font-bold text text-2xl">A meme for you</p>
      <div className="flex flex-col place-content-center self-center m-8 p-4 border border-black rounded-lg shadow-lg ">
        <button
          className="self-end border border-black rounded-full text-center align-baseline hover:border-gray-400 shadow-md hover:shadow-xl bg-black"
          onClick={() => {
            setShowMeme(false);
          }}
        >
          <p className="rounded-full hover:shadow-xl px-1 pb-1 text-white">x</p>
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
    </div>
  );
}
