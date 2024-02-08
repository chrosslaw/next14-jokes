"use client";
import { useState, useEffect } from "react";
import { getJoke, getMemes } from "./lib/load-processes";
import Meme from "./ui/meme";

export default function Home() {
  const [joke, setJoke] = useState("");
  const [jokeType, setJokeType] = useState("");
  const [memes, setMemes] = useState([]);
  const [showMeme, setShowMeme] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    fetchJoke();
  }, [jokeType]);

  useEffect(() => {
    fetchMemes();
  }, [randomNumber]);

  const fetchJoke = async (retryCount = 0) => {
    try {
      const result = await getJoke();
      const isChuckNorrisJoke =
        jokeType === "Chuck Norris" && result.joke.includes("Chuck Norris");
      const isTechJoke =
        jokeType === "Tech" && !result.joke.includes("Chuck Norris");
      isChuckNorrisJoke || isTechJoke || retryCount > 30
        ? setJoke(result.joke)
        : fetchJoke(retryCount + 1);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };
  const fetchMemes = async () => {
    try {
      const memes = await getMemes();
      setMemes(memes);
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };
  if (!memes) fetchMemes();
  console.log(memes);
  return (
    <div className="flex flex-col place-items-center w-full">
      <div className="max-w-5xl flex flex-col md:flex-row place-content-center place-items-center w-full p-2 m-4 gap-4 shadow-inner-y shadow-gray-50  bg-gradient-to-r from-white via-slate-200 via-50% to-white">
        <button
          className="w-max bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md shadow-inner shadow-red-200 hover:shadow-inner p-1 px-2 text-xl border border-gray-200 hover:border-b-red-100 hover:border-r-red-200 hover:border-t-blue-200 hover:border-l-blue-300 hover:bg-gradient-to-br from-blue-100 to-red-50"
          onClick={() => {
            showMeme
              ? setShowMeme(false)
              : jokeType !== "Chuck Norris"
              ? setJokeType("Chuck Norris")
              : fetchJoke();
          }}
        >
          Chuck Norris Joke
        </button>
        <button
          className="w-max bg-white rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md shadow-inner shadow-red-200 hover:shadow-inner p-1 px-2 text-xl border border-gray-200 hover:border-b-red-100 hover:border-r-red-200 hover:border-t-blue-200 hover:border-l-blue-300 hover:bg-gradient-to-br from-blue-100 to-red-50"
          onClick={() => {
            showMeme
              ? setShowMeme(false)
              : jokeType !== "Tech"
              ? setJokeType("Tech")
              : fetchJoke();
          }}
        >
          Tech Joke
        </button>
        <button
          className="w-max bg-white rounded-tr-2xl border-collapse rounded-bl-2xl rounded-br-md rounded-tl-md shadow-inner shadow-red-200 hover:shadow-inner p-1 px-2 text-xl border border-gray-200 hover:border-b-red-100 hover:border-r-red-200 hover:border-t-blue-200 hover:border-l-blue-300 hover:bg-gradient-to-br from-blue-100 to-red-50"
          onClick={() => {
            setRandomNumber(Math.floor(Math.random() * 100));
            if (!showMeme) setShowMeme(true);
          }}
        >
          Meme
        </button>
      </div>
      <div className="flex flex-col ">
        {!showMeme && (
          <div className="flex flex-col place-content-center self-center m-8 p-4 w-full border-t-2">
            {joke && (
              <p className="font-bold text-3xl text-center">
                A {jokeType} joke, as requested
              </p>
            )}
            <div className="flex place-items-center border-t border-r border-gray-200 rounded-lg m-8 shadow-lg shadow-gray-200 w-7/8 lg:max-w-4xl">
              <p className="text-center p-6 text-xl md:text-2xl ">
                {joke || "No joke yet!"}
              </p>
            </div>
          </div>
        )}
        {showMeme && memes.length > 0 && (
          <Meme
            meme={memes[randomNumber % memes.length]}
            showMeme={showMeme}
            setShowMeme={setShowMeme}
          />
        )}
      </div>
    </div>
  );
}
