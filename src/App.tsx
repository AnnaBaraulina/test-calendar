import { FC } from "react";
import "./App.css";
import WeekCalendar from "./components/Calendar";

const App: FC = () => {
  return (
    <div className="App">
      <WeekCalendar />
    </div>
  );
}

export default App;
