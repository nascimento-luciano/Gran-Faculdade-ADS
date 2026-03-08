// db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "database.db");

// Cria ou abre o banco de dados
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err.message);
  } else {
    console.log("Banco conectado com sucesso ✅");
  }
});

// Criação das tabelas
db.serialize(() => {
  // Tabela Fornecedores
  db.run(`
    CREATE TABLE IF NOT EXISTS fornecedores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome_empresa TEXT NOT NULL,
      cnpj TEXT NOT NULL UNIQUE,
      endereco TEXT NOT NULL,
      telefone TEXT NOT NULL,
      email TEXT NOT NULL,
      contato_principal TEXT NOT NULL
    )
  `);

  // Tabela Produtos
  db.run(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      codigo_barras TEXT UNIQUE,
      descricao TEXT NOT NULL,
      quantidade INTEGER,
      categoria TEXT,
      data_validade TEXT
    )
  `);

  // Tabela Associação Produto ↔ Fornecedor (muitos para muitos)
  db.run(`
    CREATE TABLE IF NOT EXISTS produto_fornecedor (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      produto_id INTEGER,
      fornecedor_id INTEGER,
      UNIQUE(produto_id, fornecedor_id),
      FOREIGN KEY(produto_id) REFERENCES produtos(id),
      FOREIGN KEY(fornecedor_id) REFERENCES fornecedores(id)
    )
  `);
});

module.exports = db;