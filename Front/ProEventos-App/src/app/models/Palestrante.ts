import { Evento } from "./Evento";
import { UserDetails } from "./identity/user-details";
import { UserUpdate } from "./identity/UserUpdate";
import { RedeSocial } from "./RedeSocial";

export interface Palestrante {
   id: number;
   miniCurriculo: string;
   ativo: boolean;
   user: UserDetails;
   redesSociais: RedeSocial[];
   palestrantesEventos: Evento[];
}
