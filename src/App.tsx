import "./App.css";
import WeatherBoard from "./components/WeatherBoard";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <WeatherBoard />
      </div>
    </ThemeProvider>
  );
}

export default App;
