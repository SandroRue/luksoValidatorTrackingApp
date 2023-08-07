import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GetWalletDataWithAverageData from './components/GetWalletDataWithAverageData'
import CalculateWalletValue from './components/CalculateWalletValue'

function App() {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={2}><CalculateWalletValue/></Col>
          <Col xs={10}><GetWalletDataWithAverageData /></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
