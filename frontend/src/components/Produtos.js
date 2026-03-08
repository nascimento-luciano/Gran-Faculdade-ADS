import React, { useState, useEffect } from "react";
import { listarFornecedores, cadastrarFornecedor } from "../api";

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [form, setForm] = useState({
    nome_empresa: "",
    cnpj: "",
    endereco: "",
    telefone: "",
    email: "",
    contato_principal: "",
  });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    atualizarLista();
  }, []);

  const atualizarLista = async () => {
    try {
      const res = await listarFornecedores();
      setFornecedores(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cadastrarFornecedor(form);
      setMensagem("Fornecedor cadastrado com sucesso!");
      setForm({
        nome_empresa: "",
        cnpj: "",
        endereco: "",
        telefone: "",
        email: "",
        contato_principal: "",
      });
      atualizarLista();
    } catch (err) {
      setMensagem(err.response?.data?.erro || "Erro ao cadastrar fornecedor");
    }
  };

  return (
    <div>
      <h2>Fornecedores</h2>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <input name="nome_empresa" placeholder="Nome da Empresa" value={form.nome_empresa} onChange={handleChange} required />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
        <input name="endereco" placeholder="Endereço" value={form.endereco} onChange={handleChange} required />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
        <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
        <input name="contato_principal" placeholder="Contato Principal" value={form.contato_principal} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>

      <h3>Lista de Fornecedores</h3>
      <ul>
        {fornecedores.map((f) => (
          <li key={f.id}>{f.nome_empresa} - {f.cnpj}</li>
        ))}
      </ul>
    </div>
  );
}

export default Fornecedores;