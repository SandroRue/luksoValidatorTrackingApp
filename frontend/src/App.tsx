import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GetWalletDataWithTimestamps from './components/GetWalletDataWithTimestamps'
import GetWalletDataWithAverageDate from './components/GetWalletDataWithAverageDate'

function App() {
  return (
    <div>
      <GetWalletDataWithTimestamps/>
      <GetWalletDataWithAverageDate/>
    </div>
  );
}

export default App;
