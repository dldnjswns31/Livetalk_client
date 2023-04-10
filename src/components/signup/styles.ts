import styled from "styled-components";

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 450px;
  margin-bottom: 2rem;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_2};
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 2 0;

  h1 {
    font-size: 3rem;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  flex: 3 0;
`;

const InputContaienr = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 3.5rem;
  margin-bottom: 0.5rem;

  input {
    width: 100%;
    height: 2.5rem;
    padding: 0 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray_2};
    border-radius: 0.3rem;
  }

  span {
    color: red;
    font-size: 0.7rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
`;

const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 2.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray_2 : theme.colors.yellow};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.white : theme.colors.black};
  font-size: 1.2rem;
`;

const GoToLogin = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;

const Error = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 0.7rem;
`;

const style = {
  ButtonContainer,
  FormContainer,
  GoToLogin,
  InputContaienr,
  LogoContainer,
  SignupContainer,
  SubmitButton,
  Error,
};

export default style;
