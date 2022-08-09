import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="flex flex-col w-screen min-h-screen items-center justify-center bg-trybe">
      <div className="flex flex-col items-center bg-black rounded-2xl p-4">
        <h1 className="text-3xl font-bold text-white">CARTÃO DE VISITAS</h1>
        <h1 className="text-3xl font-bold text-white">\|/___GITHUB___  \|/</h1>
        <Card />
      </div>
    </div>
  );
}

export default App;
