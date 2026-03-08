import axios from "axios";

const API_URL = "http://localhost:3000";

// Fornecedores
export const listarFornecedores = () => axios.get(`${API_URL}/fornecedores`);
export const cadastrarFornecedor = (fornecedor) => axios.post(`${API_URL}/fornecedores`, fornecedor);

// Produtos
export const listarProdutos = () => axios.get(`${API_URL}/produtos`);
export const cadastrarProduto = (produto) => axios.post(`${API_URL}/produtos`, produto);

// Associação
export const associarFornecedor = (associacao) => axios.post(`${API_URL}/associar`, associacao);
export const desassociarFornecedor = (associacao) => axios.delete(`${API_URL}/desassociar`, { data: associacao });