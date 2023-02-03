import { Link } from "react-router-dom";
import styled from "styled-components";

const StPageContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Layout = () => {
  return (
    <StPageContainer>
      <form>
        <input type="text" placeholder="이메일" />
        <input type="password" placeholder="비밀번호" />
        <button>로그인하기</button>
      </form>
      <div>
        <span>회원이 아니신가요?</span>
        <Link to="/signup">회원가입 하러가기!</Link>
      </div>
    </StPageContainer>
  );
};

export default Layout;
