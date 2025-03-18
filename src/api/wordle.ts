export const getWord = async (onFetchSuccess?: (word: string) => void) => {
  if (!import.meta.env.VITE_WORDLE_API_URL) {
    return;
  }

  try {
    const wordsListResponse = await fetch("/wordle/api/fe/wordle-words");

    if (!wordsListResponse.ok) {
      throw new Error(`Response status: ${wordsListResponse.status}`);
    }

    const wordListData = await wordsListResponse.json();

    onFetchSuccess?.(
      wordListData[Math.floor(Math.random() * wordListData.length)]
    );
  } catch (error) {
    console.error(error);
  }
};
