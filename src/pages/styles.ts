import styled from "styled-components";

const PageContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray_1};
`;

const styles = {
  PageContainer,
};

export default styles;
