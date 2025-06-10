import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MCBSNav() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/teams">Teams</Nav.Link>
            <Nav.Link href="/players">Player Stats</Nav.Link>
            <Nav.Link href="/games">Game log</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default MCBSNav;