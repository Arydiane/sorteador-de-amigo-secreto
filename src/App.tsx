import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Formulario from "./components/Formulario";
import Cabecalho from "./components/Cabecalho";

function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Cabecalho />
        <Routes>
          <Route path="/" element={<Formulario />}/>
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
