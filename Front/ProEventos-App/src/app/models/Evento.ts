import { Lote } from "./Lote";
import { Palestrante } from "./Palestrante";
import { RedeSocial } from "./RedeSocial";

export interface Evento {
   id: number;
   tema: string;
   local: string;
   dataEvento?: Date;
   qtdPessoas: number;
   imagemUrl: string;
   telefone: string;
   email: string;
   lotes: Lote[];
   redesSociais: RedeSocial[];
   palestrantes: Palestrante[];
}