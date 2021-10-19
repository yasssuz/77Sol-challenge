export interface UserDataProps {
  cep: string;
  currSpendingAmount: string;
  material: string;
}

export interface FetchedDataProps {
  potencial: string;
  co2: number;
  parcelas: {
    parcelas: number;
    valor_minimo: number;
    valor_maximo: number;
  }[];
}

export interface InputAreaProps {
  dataReceiver: (newData: UserDataProps) => Promise<void>;
  loading: boolean;
}

export interface OutputAreaProps {
  data: FetchedDataProps;
}
