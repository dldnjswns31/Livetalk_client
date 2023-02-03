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
      <div>
        <form action="">
          <input type="text" />
          <input type="text" />
          <button>회원가입하기</button>
        </form>
      </div>
    </StPageContainer>
  );
};

export default Layout;
