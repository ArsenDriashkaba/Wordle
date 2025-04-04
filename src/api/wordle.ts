import { Word } from "../types/shared";
import { endpoints } from "./endpoints";

type Request<T> = {
  endpoint: string;
  onSuccess?: (data: T) => void;
  onError?: (error?: any) => void;
};

export const getData = async <T>({
  endpoint,
  onSuccess,
  onError,
}: Request<T>) => {
  if (!import.meta.env.VITE_API_URL) {
    return null;
  }

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseData = await response.json();

    onSuccess?.(responseData);

    return responseData;
  } catch (error) {
    console.error(error);
    onError?.(error);
  }
};

export const getWords = async (
  onSuccess?: (words: Word[]) => void
): Promise<Word[]> =>
  await getData({ endpoint: endpoints.getWords, onSuccess });
