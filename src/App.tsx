import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Cabecalho from "./components/Cabecalho";
import Configuracao from "./pages/Configuracao";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Cabecalho />
        <Routes>
          <Route path="/" element={<Configuracao />}/>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
