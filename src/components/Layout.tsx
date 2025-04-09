import { FC, ReactNode } from "react";
import { WordsContextWrapper } from "../store";

type Props = { children: ReactNode };

export const Layout: FC<Props> = ({ children }) => {
  return (
    <WordsContextWrapper>
      <main className="h-screen bg-secondary flex items-center justify-center *:w-3xl">
        {children}
      </main>
    </WordsContextWrapper>
  );
};
