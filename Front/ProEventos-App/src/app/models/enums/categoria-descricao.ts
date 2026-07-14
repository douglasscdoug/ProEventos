import { Categoria } from "./categoria.enum";

export const CategoriaDescricao: Record<Categoria, string> = {
  [Categoria.Hospedagem]: 'Hospedagem',
  [Categoria.Buffet]: 'Buffet',
  [Categoria.Fotografia]: 'Fotografia',
  [Categoria.Filmagem]: 'Filmagem',
  [Categoria.Som]: 'Som',
  [Categoria.Iluminacao]: 'Iluminação',
  [Categoria.Seguranca]: 'Segurança',
  [Categoria.Transporte]: 'Transporte',
  [Categoria.Ambulancia]: 'Ambulância',
  [Categoria.Patrocinador]: 'Patrocinador',
  [Categoria.EmpresaParceira]: 'Empresa Parceira',
  [Categoria.Outros]: 'Outros'
};