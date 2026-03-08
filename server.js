// server.js – Backend Controle de Estoque
const express = require("express");
const cors = require("cors");
const db = require("./database/db"); // importa o banco de dados

const app = express();
app.use(cors());
app.use(express.json());

// =============================
// ROTA PRINCIPAL
// =============================
app.get("/", (req, res) => {
  res.send("API Controle de Estoque funcionando 🚀");
});

// =============================
// CRUD FORNECEDORES
// =============================

// Listar fornecedores
app.get("/fornecedores", (req, res) => {
  db.all("SELECT * FROM fornecedores", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// Cadastrar fornecedor
app.post("/fornecedores", (req, res) => {
  const { nome_empresa, cnpj, endereco, telefone, email, contato_principal } = req.body;

  if (!nome_empresa || !cnpj || !endereco || !telefone || !email || !contato_principal) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  const sql = `
    INSERT INTO fornecedores (nome_empresa, cnpj, endereco, telefone, email, contato_principal)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome_empresa, cnpj, endereco, telefone, email, contato_principal], function (err) {
    if (err) return res.status(400).json({ erro: "Fornecedor com esse CNPJ já está cadastrado!" });
    res.json({ mensagem: "Fornecedor cadastrado com sucesso!", id: this.lastID });
  });
});

// =============================
// CRUD PRODUTOS
// =============================

// Listar produtos
app.get("/produtos", (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// Cadastrar produto
app.post("/produtos", (req, res) => {
  const { nome, codigo_barras, descricao, quantidade, categoria, data_validade } = req.body;

  if (!nome || !descricao) {
    return res.status(400).json({ erro: "Nome e descrição do produto são obrigatórios" });
  }

  const sql = `
    INSERT INTO produtos (nome, codigo_barras, descricao, quantidade, categoria, data_validade)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(sql, [nome, codigo_barras, descricao, quantidade, categoria, data_validade], function (err) {
    if (err) return res.status(400).json({ erro: "Produto com este código de barras já está cadastrado!" });
    res.json({ mensagem: "Produto cadastrado com sucesso!", id: this.lastID });
  });
});

// =============================
// ASSOCIAÇÃO PRODUTO ↔ FORNECEDOR
// =============================

// Associar fornecedor a produto
app.post("/associar", (req, res) => {
  const { produto_id, fornecedor_id } = req.body;

  if (!produto_id || !fornecedor_id) {
    return res.status(400).json({ erro: "Produto e fornecedor são obrigatórios" });
  }

  const sql = `INSERT OR IGNORE INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)`;

  db.run(sql, [produto_id, fornecedor_id], function (err) {
    if (err) return res.status(500).json({ erro: "Erro ao associar fornecedor ao produto" });
    if (this.changes === 0) {
      return res.status(400).json({ erro: "Fornecedor já está associado a este produto!" });
    }
    res.json({ mensagem: "Fornecedor associado com sucesso ao produto!" });
  });
});

// Listar fornecedores de um produto
app.get("/produtos/:id/fornecedores", (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT DISTINCT fornecedores.*
    FROM fornecedores
    JOIN produto_fornecedor
    ON fornecedores.id = produto_fornecedor.fornecedor_id
    WHERE produto_fornecedor.produto_id = ?
  `;

  db.all(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// Desassociar fornecedor de produto
app.delete("/desassociar", (req, res) => {
  const { produto_id, fornecedor_id } = req.body;

  const sql = `DELETE FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?`;

  db.run(sql, [produto_id, fornecedor_id], function (err) {
    if (err) return res.status(500).json({ erro: "Erro ao desassociar fornecedor" });
    res.json({ mensagem: "Fornecedor desassociado com sucesso!" });
  });
});

// =============================
// INICIAR SERVIDOR
// =============================
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

module.exports = db;