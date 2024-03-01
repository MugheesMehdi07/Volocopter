
import { useDrop } from "react-dnd";
import { cardType } from "../types/constants";
import "../styles/column.css";





function Column({ children, name }: { children: any; name: string }) {
  const [{ isOver }, dropref] = useDrop({
    accept: cardType.MISSION,
    drop: () => ({
      name,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className="columnContainer" ref={dropref}>
      <div className="columnHeader">{name}</div>
      <div className={`dropArea ${isOver ? 'isOver' : ''}`}>{children}</div>
    </div>
  );
}

export default Column;
