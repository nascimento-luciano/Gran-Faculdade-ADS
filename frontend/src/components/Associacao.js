import React, { useState, useEffect } from "react";
import { listarProdutos, listarFornecedores, associarFornecedor, desassociarFornecedor } from "../api";

function Associacao() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const produtosRes = await listarProdutos();
      setProdutos(produtosRes.data);
      const fornecedoresRes = await listarFornecedores();
      setFornecedores(fornecedoresRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssociar = async () => {
    try {
      await associarFornecedor({ produto_id: produtoSelecionado, fornecedor_id: fornecedorSelecionado });
      setMensagem("Fornecedor associado com sucesso ao produto!");
    } catch (err) {
      setMensagem(err.response?.data?.erro || "Erro ao associar fornecedor");
    }
  };

  const handleDesassociar = async () => {
    try {
      await desassociarFornecedor({ produto_id: produtoSelecionado, fornecedor_id: fornecedorSelecionado });
      setMensagem("Fornecedor desassociado com sucesso!");
    } catch (err) {
      setMensagem(err.response?.data?.erro || "Erro ao desassociar fornecedor");
    }
  };

  return (
    <div>
      <h2>Associação Produto ↔ Fornecedor</h2>
      {mensagem && <p>{mensagem}</p>}

      <select onChange={(e) => setProdutoSelecionado(e.target.value)} value={produtoSelecionado}>
        <option value="">Selecione um Produto</option>
        {produtos.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
      </select>

      <select onChange={(e) => setFornecedorSelecionado(e.target.value)} value={fornecedorSelecionado}>
        <option value="">Selecione um Fornecedor</option>
        {fornecedores.map((f) => <option key={f.id} value={f.id}>{f.nome_empresa}</option>)}
      </select>

      <button onClick={handleAssociar}>Associar Fornecedor</button>
      <button onClick={handleDesassociar}>Desassociar Fornecedor</button>
    </div>
  );
}

export default Associacao;