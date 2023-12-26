"use client";
import { useState, useEffect } from "react";
import { getJoke, getMemes } from "./lib/load-processes";

export default function Home() {
  const [joke, setJoke] = useState("");
  const [jokeType, setJokeType] = useState("");

  useEffect(() => {
    fetchJoke();
  }, [jokeType]);

  const fetchJoke = async (retryCount = 0) => {
    try {
      const result = await getJoke();
      if (result.error) {
        console.error("Error:", result.error);
      } else {
        const isChuckNorrisJoke =
          jokeType === "Chuck Norris" && result.joke.includes("Chuck Norris");
        const isTechJoke =
          jokeType === "Tech" && !result.joke.includes("Chuck Norris");

        if (isChuckNorrisJoke || isTechJoke || retryCount > 30) {
          setJoke(result.joke);
        } else {
          fetchJoke(retryCount + 1);
        }
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
    }
  };

  return (
    <div className="flex flex-col place-items-center">
      <div className="flex flex-col md:flex-row place-items-center mb-4 gap-4">
        <button
          className="border w-max bg-yellow-50 border-black rounded-md hover:border-blue-400 shadow-md hover:shadow-xl p-2 text-xl"
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
          className="border w-max bg-yellow-50 border-black rounded-md hover:border-blue-400 shadow-md hover:shadow-xl p-2  text-xl"
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
      </div>
      <div className="flex flex-col place-items-center">
        <p className="font-bold text-3xl">A {jokeType} joke, as requested</p>
        <div className="border border-black rounded-lg m-8 shadow-lg ">
          <p className="p-6 text-xl md:text-2xl">{joke || "No joke yet!"}</p>
        </div>
      </div>
    </div>
  );
}
