import { Game } from "./components/Game";
import { WordsContextWrapper } from "./store";

function App() {
  return (
    <WordsContextWrapper>
      <Game />
    </WordsContextWrapper>
  );
}

export default App;
