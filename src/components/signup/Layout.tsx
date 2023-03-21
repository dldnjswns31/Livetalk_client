import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import authAPI from "../../api/auth";
import { ISignupForm } from "../../types/signup";
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
  height: 450px;
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
    color: red;
    font-size: 0.7rem;
  }
`;

const StButtonContainer = styled.div`
  width: 100%;
`;

const StSubmitButton = styled.button<{ disabled: boolean }>`
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

const StGoToLogin = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;

const Layout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<ISignupForm>();
  const navigate = useNavigate();

  const onSubmit = async (data: ISignupForm) => {
    try {
      const response = await authAPI.signup(data);
      navigate("/login");
    } catch (err) {
      console.log(err);
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
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "올바른 이메일 형식을 입력해주세요",
                  },
                })}
              />
              <span>{errors?.email?.message}</span>
            </StInputContaienr>
            <StInputContaienr>
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
            </StInputContaienr>
            <StInputContaienr>
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
            </StInputContaienr>
            <StButtonContainer>
              <StSubmitButton disabled={!isDirty || !isValid}>
                회원가입
              </StSubmitButton>
            </StButtonContainer>
          </form>
        </StFormContainer>
      </StSignupContainer>
      <div>
        <p>
          계정이 있으신가요?&nbsp;&nbsp;
          <Link to="/">
            <StGoToLogin>로그인하러 가기</StGoToLogin>
          </Link>
        </p>
      </div>
    </StPageContainer>
  );
};

export default withAuth(Layout, false);
