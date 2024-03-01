import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from 'antd';
import { mission } from "../types/ticket";
import { fetchMissions } from "../services/mission-service";
import Cards from "./cards";
import Column from "./columns";
import { ColumnTypes } from "../types/constants";
import '../styles/board.css';

const columnItem = (missions : Array<mission>, columnName: string, setMissions: any) => {
  return missions
    ?.filter((mission) => mission.status === columnName)
    .map((mission, index) => (
      <Cards
        key={mission.id}
        m_id={mission.id}
        name={mission.name}
        description={mission.description}
        setMissions={setMissions}
        index={index}
      />
    ));
};

export const Board: React.FC<{ missions: mission[], setMissions: any }> = ({ missions, setMissions }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const fetchedMissionsRef = useRef<boolean>(false);

  useEffect(() => {

    // Fetch missions
    const loadMissions = async () => {
      try {
        if(!fetchedMissionsRef.current){
          const fetchedMissions: mission[] = await fetchMissions();
          setMissions(fetchedMissions);
        }
       
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMissions();
  }, []);


  

  if (isLoading) return <div>Loading missions...</div>;

  return (
    <div className="boardWrapper">
      <Row gutter={16} style={{ height: '100%' }}>
        <Col span={8}><Column name={ColumnTypes.COL1}>{columnItem(missions, ColumnTypes.COL1, setMissions)}</Column></Col>
        <Col span={8}><Column name={ColumnTypes.COL2}>{columnItem(missions, ColumnTypes.COL2, setMissions)}</Column></Col>
        <Col span={8}><Column name={ColumnTypes.COL3}>{columnItem(missions, ColumnTypes.COL3, setMissions)}</Column></Col>
      </Row>

      
    </div>
  );
};

export default Board;
