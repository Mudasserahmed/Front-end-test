import logo from './logo.svg';
import './App.css';
import { Card } from './components/Card';
import Top from './components/Top';
import Tabs from './components/Tabs';

function App() {
  return (
    <>
      <section>
        <Top />
      </section>
      <section className="w-full h-24 bg-gradient-to-r px-32 from-red-50 via-red-50 to-red-100 flex items-center justify-start">
        <h1 className="text-3xl font-bold text-black">Week Orders</h1>
      </section>
      <section className="">
        <Tabs/>
      </section>
      
    </>
  );
}

export default App;
