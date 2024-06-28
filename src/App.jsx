import './App.css'
import Heading from './Components/Heading';
import AddItem from './Components/AddItem';
import Display from './Components/Display';
import Transactions from './Components/Transactions';
import Data, { transData } from './store/Data';
function App() {
  return (
    <>
      <div className="container">
        <Data>
        <Heading/>
        <Display/>
        <AddItem/>
        <Transactions/>
        </Data>
      </div>
    </>
  )
}

export default App;
