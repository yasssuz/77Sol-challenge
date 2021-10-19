import { useState } from "react";
import styled from "styled-components";

import { FetchedDataProps, UserDataProps } from "../utils/types";

import InitialAnimation from "../components/InitialAnimation";
import InputArea from "../components/InputArea";
import OutputArea from "../components/OutputArea";

function App() {
  const [fetchedData, setFetchedData] = useState<FetchedDataProps>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchData(userData: UserDataProps): Promise<void> {
    setIsLoading(true);
    const { material, cep, currSpendingAmount } = userData;
    const res = await fetch(
      `https://api2.77sol.com.br/busca-cep?estrutura=${material}&valor_conta=${currSpendingAmount}&cep=${cep}`
    );
    const data = await res.json();
    const formattedData: FetchedDataProps = {
      potencial: data.potencial,
      co2: data.co2,
      parcelas: data.parcelamento,
    };

    setFetchedData(formattedData);
    setIsLoading(false);
  }

  return (
    <PageContiner>
      <InitialAnimation />
      <InputArea dataReceiver={fetchData} loading={isLoading} />
      {fetchedData && <OutputArea data={fetchedData} />}
    </PageContiner>
  );
}

const PageContiner = styled.main`
  background: ${props => props.theme.colors.veryLightGray};
  min-height: 100vh;
  display: grid;
  place-content: center;
  grid-template-columns: repeat(2, auto);
`;

export default App;
