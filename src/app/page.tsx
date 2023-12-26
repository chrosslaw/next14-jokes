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

      if (isChuckNorrisJoke || isTechJoke || retryCount > 30) {
        setJoke(result.joke);
      } else {
        fetchJoke(retryCount + 1);
      }
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
  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col md:flex-row place-content-center place-items-center w-full p-2 m-4 gap-4 shadow-inner-y shadow-gray-200  bg-gradient-to-r from-white from-20% via-slate-300 via-50% to-white to-80%">
        <button
          className="border w-max bg-white border-black rounded-md hover:border-blue-400 shadow-md hover:shadow-xl p-1 text-xl"
          onClick={() => {
            if (jokeType !== "Chuck Norris") {
              setJokeType("Chuck Norris");
            } else {
              fetchJoke();
            }
          }}
        >
          Chuck Norris Joke
        </button>
        <button
          className="border w-max bg-white border-black rounded-md hover:border-blue-400 shadow-md hover:shadow-xl p-1  text-xl"
          onClick={() => {
            if (jokeType !== "Tech") {
              setJokeType("Tech");
            } else {
              fetchJoke();
            }
          }}
        >
          Tech Joke
        </button>
        <button
          className="border w-max bg-white border-black rounded-md hover:border-blue-400 shadow-md hover:shadow-xl p-1  text-xl"
          onClick={() => {
            setRandomNumber(Math.floor(Math.random() * 100));
            if (!showMeme) setShowMeme(true);
          }}
        >
          Meme
        </button>
      </div>
      <div className="flex flex-col place-items-center">
        <p className="font-bold text-3xl">A {jokeType} joke, as requested</p>
        <div className="border border-black rounded-lg m-8 shadow-lg ">
          <p className="p-6 text-xl md:text-2xl">{joke || "No joke yet!"}</p>
        </div>
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
