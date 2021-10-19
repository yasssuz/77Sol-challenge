import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import { OutputAreaProps } from "../utils/types";

export default function OutputArea({ data }: OutputAreaProps) {
  const { co2, parcelas, potencial } = data;
  const containerRef = useRef<HTMLDivElement>(null);

  function formatAmount(amount: number): string {
    return amount.toLocaleString("en-us", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }

  useEffect(() => {
    gsap.to(containerRef.current, {
      delay: 1.3,
      duration: 1.6,
      ease: "back.out",
      css: {
        transform: "translate(-50%, -50%) scale(1)",
      },
    });
  }, [data]);

  return (
    <Container ref={containerRef}>
      <Logo src='/logo.png' alt='77Sol' />
      <Title>Encontramos um potencial solar {potencial} na sua regiao!</Title>
      <SubTitle>
        Que tal fazermos um "<strong>{potencial}</strong>" desconto tambem?{" "}
      </SubTitle>
      <Price className='not-promo'>
        Preco: <strong>{formatAmount(parcelas[0]?.valor_maximo)}</strong>
      </Price>
      <Price>
        Preco: <strong>{formatAmount(parcelas[0]?.valor_minimo)}</strong>
      </Price>
      <Installment>
        <Arrow />
        <SubTitle style={{ marginBottom: "1rem" }}>Ou parcele!</SubTitle>
        <Select>
          {parcelas.map(parcela => (
            <option key={parcela.parcelas} value={parcela.parcelas}>{`${
              parcela.parcelas
            }x de ${formatAmount(parcela.valor_minimo)} a ${formatAmount(
              parcela.valor_maximo
            )}`}</option>
          ))}
        </Select>
      </Installment>
      <CloseLink href='/'>Pronto para comprar?</CloseLink>
      <Small>Voce vai remover {formatAmount(co2)} litros de c02 do ar!</Small>
    </Container>
  );
}

const Container = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 2.5rem 2rem;
  width: 92%;
  max-width: 450px;
  border-radius: 0.8rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 2rem 0;
  transform: translate(-50%, -50%) scale(0);
`;

const Small = styled.small`
  text-align: center;
  display: block;
  margin-top: 0.3rem;
  font-size: 0.9rem;
`;

const CloseLink = styled.a`
  padding: 0.95em 0;
  margin-top: 1.6rem;
  display: block;
  text-align: center;
  background: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  letter-spacing: 0.5px;
  cursor: pointer;

  &:focus {
    outline: dashed 2px ${props => props.theme.colors.blue};
  }
`;

const Arrow = styled.div`
  position: absolute;
  right: 1.2rem;
  bottom: 1.1rem;
  border-left: 8px solid transparent;
  border-top: 10px solid ${props => props.theme.colors.blue};
  border-right: 8px solid transparent;
`;

const Select = styled.select`
  width: 100%;
  height: 2.7rem;
  border-radius: 9px;
  border: 1px solid ${props => props.theme.colors.lightGray};
  background: ${props => props.theme.colors.veryLightGray};
  padding: 0 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  appearance: none;

  &:focus {
    outline: dashed 2px ${props => props.theme.colors.blue};
  }
`;

const Installment = styled.div`
  margin-top: 1.3rem;
  position: relative;
`;

const Logo = styled.img`
  text-align: center;
  margin: auto;
  display: block;
  width: 110px;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.blue};
  margin-bottom: 1rem;
`;

const SubTitle = styled.p`
  font-size: 1.3rem;
  line-height: 1.3em;
  margin-bottom: 2rem;
  color: #222;

  strong {
    text-transform: lowercase;
  }
`;

const Price = styled.p`
  font-size: 1.2rem;

  &.not-promo {
    opacity: 0.5;
    text-decoration: line-through;
    margin-bottom: 0.5rem;

    strong {
      font-size: 1.5rem;
    }
  }

  strong {
    font-size: 2.1rem;
    margin-left: 0.8rem;
    color: ${props => props.theme.colors.blue};
  }
`;
