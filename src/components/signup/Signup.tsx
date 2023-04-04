import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import authAPI from "../../api/auth";
import { ISignupForm } from "../../types/signup";
import withAuth from "../HOC/withAuth";
import St from "./styles";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ISignupForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignupForm) => {
    try {
      await authAPI.signup(data);
      navigate("/login");
    } catch (err) {
      console.log(err);
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
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "올바른 이메일 형식을 입력해주세요",
                  },
                })}
              />
              <span>{errors?.email?.message}</span>
            </St.InputContaienr>
            <St.InputContaienr>
              <input
                type="text"
                placeholder="닉네임"
                {...register("nickname", {
                  required: "닉네임을 입력해 주세요.",
                  pattern: {
                    value: /^[가-힣a-zA-Z0-9]+$/,
                    message: "닉네임은 한글, 영어, 숫자만 입력 가능합니다.",
                  },
                  maxLength: {
                    value: 8,
                    message: "최대 8자까지 가능합니다.",
                  },
                })}
              />
              <span>{errors?.nickname?.message}</span>
            </St.InputContaienr>
            <St.InputContaienr>
              <input
                type="password"
                placeholder="비밀번호"
                {...register("password", {
                  required: "비밀번호를 입력해 주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자리 이상이어야합니다.",
                  },
                })}
              />
              <span>{errors?.password?.message}</span>
            </St.InputContaienr>
            <St.ButtonContainer>
              <St.SubmitButton disabled={!isDirty || !isValid}>
                회원가입
              </St.SubmitButton>
            </St.ButtonContainer>
          </form>
        </St.FormContainer>
      </St.SignupContainer>
      <div>
        <p>
          계정이 있으신가요?&nbsp;&nbsp;
          <Link to="/login">
            <St.GoToLogin>로그인하러 가기</St.GoToLogin>
          </Link>
        </p>
      </div>
    </>
  );
};

export default withAuth(Signup, false);
