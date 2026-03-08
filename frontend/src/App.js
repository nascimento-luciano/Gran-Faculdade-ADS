import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Fornecedores from "./components/Fornecedores";
import Produtos from "./components/Produtos";
import Associacao from "./components/Associacao";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>Controle de Estoque</h1>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/fornecedores" style={{ marginRight: "10px" }}>Fornecedores</Link>
          <Link to="/produtos" style={{ marginRight: "10px" }}>Produtos</Link>
          <Link to="/associacao">Associação</Link>
        </nav>
        <Routes>
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/associacao" element={<Associacao />} />
          <Route path="*" element={<h2>Rota não encontrada</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;