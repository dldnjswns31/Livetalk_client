import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import styled from "styled-components";

import authAPI from "../../api/auth";
import { ISigninForm } from "../../types/signin";
import { saveToken } from "../../utils/token";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { saveUserData } from "../../redux/slice/userSlice";
import withAuth from "../HOC/withAuth";

const StPageContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray_1};
`;

const StSignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: 350px;
  margin-bottom: 2rem;
  padding: 2.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray_2};
`;

const StLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 2 0;

  h1 {
    font-size: 3rem;
  }
`;

const StFormContainer = styled.div`
  width: 100%;
  flex: 3 0;
`;

const StInputContaienr = styled.div`
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
    color: ${({ theme }) => theme.colors.red};
    font-size: 0.7rem;
  }
`;

const StButtonContainer = styled.div`
  width: 100%;
`;

const StSubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 2.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.gray_2 : theme.colors.yellow};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.white : theme.colors.black};
  font-size: 1.2rem;
`;

const StGoToLogin = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;

const StError = styled.span`
  color: ${({ theme }) => theme.colors.red};
  font-size: 0.7rem;
`;

const Layout = () => {
  const [error, setError] = useState<undefined | string>();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ISigninForm>({ mode: "onChange" });

  const onSubmit = async (form: ISigninForm) => {
    try {
      const res = await authAPI.signin(form);
      saveToken(res.headers.authorization);
      dispatch(saveUserData(res.data.data));
      navigate("/");
    } catch (err) {
      const error = err as AxiosError<string>;
      setError(error.response?.data);
    }
  };

  return (
    <StPageContainer>
      <StSignupContainer>
        <StLogoContainer>
          <h1>LIVE CHAT</h1>
        </StLogoContainer>
        <StFormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <StInputContaienr>
              <input
                type="text"
                placeholder="이메일"
                {...register("email", {
                  required: true,
                  pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                })}
              />
            </StInputContaienr>
            <StInputContaienr>
              <input
                type="password"
                placeholder="비밀번호"
                {...register("password", { required: true, minLength: 8 })}
              />
            </StInputContaienr>
            <StButtonContainer>
              <StSubmitButton disabled={!isDirty || !isValid}>
                로그인
              </StSubmitButton>
              <StError>{error}</StError>
            </StButtonContainer>
          </form>
        </StFormContainer>
      </StSignupContainer>
      <div>
        <p>
          계정이 없으신가요?&nbsp;&nbsp;
          <Link to="/signup">
            <StGoToLogin>회원가입하러 가기</StGoToLogin>
          </Link>
        </p>
      </div>
    </StPageContainer>
  );
};

export default withAuth(Layout, false);
