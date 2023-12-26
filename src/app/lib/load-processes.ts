export async function getJoke() {
  try {
    const response = await fetch(
      "https://geek-jokes.sameerkumar.website/api?format=json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    // Handle the error, e.g., log it or return a custom error message
    console.error("There was a problem fetching the joke:", error);
    return { error: "Failed to fetch joke" };
  }
}

export async function getMemes() {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const json = await response.json();
    return json;
  } catch (error) {
    // Handle the error, e.g., log it or return a custom error message
    console.error("There was a problem fetching the memes:", error);
    return { error: "Failed to fetch memes" };
  }
}
