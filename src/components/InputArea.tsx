import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";

export default function InputArea() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(containerRef.current, {
      delay: 6,
      duration: 1.6,
      ease: "back.out",
      css: {
        transform: "scale(1)",
      },
    });
  }, []);

  return (
    <Container ref={containerRef}>
      <Title>Hey! Que tal simularmos o seu gasto?</Title>
      <FormArea>
        {[
          {
            label: "CEP",
            id: "cep",
            mask: true,
          },
          {
            label: "Gasto médio da conta de luz",
            id: "gastos",
          },
        ].map(data => (
          <div key={data.id}>
            <Label htmlFor={data.id}>{data.label}</Label>
            <TextInput
              placeholder={data.id === "cep" ? "00000-000" : "3.500"}
              id={data.id}
              type='text'
            />
          </div>
        ))}
        <div style={{ position: "relative" }}>
          <Arrow />
          <Label htmlFor='material'>Material</Label>
          <Select id='material'>
            <option selected disabled hidden value='fibrocimento-madeira'>
              selecione o material
            </option>
            {[
              "fibrocimento-madeira",
              "fibrocimento-metalico",
              "ceramico",
              "metalico",
              "laje",
              "solo",
            ].map(material => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </Select>
        </div>
        <SubmitBtn type='submit'>Continuar</SubmitBtn>
      </FormArea>
    </Container>
  );
}

const Container = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 450px;
  border-radius: 0.8rem;
  transform: scale(0);
  /* transition: transform 4s ease; */
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2rem;
  letter-spacing: 1px;
  color: ${props => props.theme.colors.blue};
  margin-bottom: 2rem;
`;

const FormArea = styled.form`
  width: 100%;
  display: grid;
  gap: 1.5rem;
`;

const Label = styled.label`
  display: block;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 0.2rem;
  font-size: 0.95rem;
  cursor: pointer;
`;

const TextInput = styled.input`
  width: 100%;
  height: 2.7rem;
  border-radius: 9px;
  border: 1px solid ${props => props.theme.colors.lightGray};
  background: ${props => props.theme.colors.veryLightGray};
  padding: 0 1.2rem;
  font-size: 1rem;

  &:focus {
    outline: dashed 2px ${props => props.theme.colors.blue};
  }
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

  option {
    padding: 2rem;
  }
`;

const Arrow = styled.div`
  position: absolute;
  /* width: 10px;
  height: 10px; */
  right: 1.2rem;
  bottom: 1.1rem;
  border-left: 8px solid transparent;
  border-top: 10px solid ${props => props.theme.colors.blue};
  border-right: 8px solid transparent;
`;

const SubmitBtn = styled.button`
  height: 3rem;
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
