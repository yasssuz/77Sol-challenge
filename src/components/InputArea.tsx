import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import InputMask from "react-input-mask";

import { InputAreaProps, UserDataProps } from "../utils/types";

export default function InputArea({ dataReceiver, loading }: InputAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cepError, setCepError] = useState<boolean>(false);
  const [exiting, setExiting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserDataProps>({
    mode: "onTouched",
  });
  const onSubmit: SubmitHandler<UserDataProps> = async data => {
    if (data.cep.includes("_")) return setCepError(true);
    setCepError(false);
    await dataReceiver({
      cep: data.cep,
      currSpendingAmount: data.currSpendingAmount,
      material: data.material,
    });

    gsap.to(containerRef.current, {
      duration: 1.3,
      opacity: 0,
      ease: "ease-in",
      css: {
        transform: "scale(0)",
      },
      onComplete: () => setExiting(true),
    });
  };

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
    <>
      {!exiting && (
        <Container className={`${exiting && "exit"}`} ref={containerRef}>
          <Title>Hey! Que tal simularmos o seu gasto?</Title>
          <FormArea onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor='cep'>CEP</Label>
              <InputMask
                {...register("cep", {
                  required: true,
                  minLength: 8,
                  maxLength: 9,
                })}
                mask='99999-999'
                id='cep'
                type='text'
                className={`${errors.cep && "error"} ${cepError && "error"}`}
              />
            </div>
            <div>
              <Label htmlFor='gastos'>Gasto médio da conta de luz</Label>
              <input
                {...register("currSpendingAmount", {
                  required: true,
                  min: 1,
                  pattern: /^[0-9]+$/,
                })}
                defaultValue='0'
                id='gastos'
                type='text'
                className={errors.currSpendingAmount && "error"}
              />
            </div>
            <div style={{ position: "relative" }}>
              <Arrow />
              <Label htmlFor='material'>Material</Label>
              <Select id='material' {...register("material")}>
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
            <SubmitBtn type='submit'>
              {loading ? "Carregando..." : "Continuar"}
            </SubmitBtn>
          </FormArea>
        </Container>
      )}
    </>
  );
}

const Container = styled.section`
  background: ${props => props.theme.colors.white};
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 450px;
  border-radius: 0.8rem;
  transform: scale(0);

  &.exit {
    display: none;
  }
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

  input {
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

    &.error {
      outline: red 1px solid;
      border: 1px solid red;
      background: #ff000039;
    }
  }
`;

const Label = styled.label`
  display: block;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.gray};
  margin-bottom: 0.2rem;
  font-size: 0.95rem;
  cursor: pointer;
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
