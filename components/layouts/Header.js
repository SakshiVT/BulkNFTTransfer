import styled from 'styled-components';
import Navbar from './components/Navbar';

const Header = () => {
  return (
  
     
      <Navbar/>
    
  )
};

const HeaderWrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
 {/* <HeaderLogo />
      <HeaderNav />
      <HeaderRight /> */}
export default Header