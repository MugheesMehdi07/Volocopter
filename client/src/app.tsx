import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Dashboard from "./pages/dashboard";
// import TestPage from "./pages/TestPage";

export const App: React.FC = () => {

 

  return  <DndProvider backend={HTML5Backend}><Dashboard /></DndProvider>;
};
