import { Categoria } from "./enums/categoria.enum";

export interface Parceiro {
    id: number;
    nome: string;
    categoria: Categoria;
    responsavel: string;
    email: string;
    telefone: string;
    site?: string;
    imagemUrl: string;
    observacao?: string;
    ativo: boolean;
}
