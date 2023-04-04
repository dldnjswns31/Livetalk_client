import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import authAPI from "../../api/auth";
import { ISigninForm } from "../../types/signin";
import { saveToken } from "../../utils/token";
import { useAppDispatch } from "../../hooks";
import { saveUserData } from "../../redux/slice/userSlice";
import withAuth from "../HOC/withAuth";
import St from "./styles";

const Login = () => {
  const [error, setError] = useState<undefined | string>();
  const dispatch = useAppDispatch();
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
    <>
      <St.SignupContainer>
        <St.LogoContainer>
          <h1>LIVE CHAT</h1>
        </St.LogoContainer>
        <St.FormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <St.InputContaienr>
              <input
                type="text"
                placeholder="이메일"
                {...register("email", {
                  required: true,
                  pattern: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                })}
              />
            </St.InputContaienr>
            <St.InputContaienr>
              <input
                type="password"
                placeholder="비밀번호"
                {...register("password", { required: true, minLength: 8 })}
              />
            </St.InputContaienr>
            <St.ButtonContainer>
              <St.SubmitButton disabled={!isDirty || !isValid}>
                로그인
              </St.SubmitButton>
              <St.Error>{error}</St.Error>
            </St.ButtonContainer>
          </form>
        </St.FormContainer>
      </St.SignupContainer>
      <div>
        <p>
          계정이 없으신가요?&nbsp;&nbsp;
          <Link to="/signup">
            <St.GoToLogin>회원가입하러 가기</St.GoToLogin>
          </Link>
        </p>
      </div>
    </>
  );
};

export default withAuth(Login, false);
