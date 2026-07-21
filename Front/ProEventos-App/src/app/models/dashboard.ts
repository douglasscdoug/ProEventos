export interface Dashboard {
    cards: DashboardCards;
    eventosPorMes: DashboardEventosMes[];
    proximosEventos: DashboardProximoEvento[];
}

export interface DashboardCards {
  totalEventos: number;
  totalPalestrantes: number;
  totalParceiros: number;
}

export interface DashboardEventosMes {
  ano: number;
  mes: number;
  quantidade: number;
}

export interface DashboardProximoEvento {
  id: number;
  tema: string;
  local: string;
  dataEvento: string | null;
}
