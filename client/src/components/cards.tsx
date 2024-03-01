import { useDrag } from "react-dnd";
import { ColumnTypes, cardType } from "../types/constants";
import { deleteMission, updateMission } from "../services/mission-service";
import { mission } from "../types/ticket";
import { Card, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import '../styles/cards.css';



type obj = {
  name: {};
};

function Cards({
  name,
  description,
  m_id,
  setMissions,
}: {
  name: string;
  description: string;
  m_id: number;
  setMissions: any;
  index: number;
}) {
  const orderColumnChange = (currentMissionId: number, columnName: string) => {
    setMissions((prevState: mission[]) => {
      return prevState.map((item: mission) => {
        console.log("item", item);
        console.log("currentMission", currentMissionId);
        return {
          ...item,
          status: item.id === currentMissionId ? columnName : item.status,
        };
      });
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: cardType.MISSION,
    item: { m_id, name, description },
    end: async (item, monitor) => {
      const dropResult = monitor.getDropResult<obj>();

      if (dropResult) {
        const { name } = dropResult;
        const { COL1, COL2, COL3 } = ColumnTypes;
        let newStatus = 1;
        console.log("name", name);

        switch (name) {
          case COL1:
            orderColumnChange(m_id, ColumnTypes.COL1);
            newStatus = 1;
            break;
          case COL2:
            orderColumnChange(m_id, ColumnTypes.COL2);
            newStatus = 2;
            break;
          case COL3:
            orderColumnChange(m_id, ColumnTypes.COL3);
            newStatus = 3;
            break;

          default:
            break;
        }

        try {
          const missionData: mission = {
            id: m_id,
            name: description,
            description: description,
            status: newStatus.toString(),
          };

          const response = await updateMission(missionData);
          console.log("Updated mission:", response);
        } catch (error) {
          console.error("Failed to fetch missions:", error);
        } finally {
          console.log("Mission Updated:", m_id);
        }
      }
    },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });


  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this mission?',
      // Optionally customize the modal further (e.g., add an icon)
      onOk() {
        deleteMission(m_id) // Assuming deleteMission is your API call
          .then(() => {
            setMissions(prevState => prevState.filter(mission => mission.id !== m_id));
          })
          .catch(error => {
            console.error("Failed to delete mission:", error);
            // Optionally handle error state (e.g., show notification)
          });
      },
      // Define onCancel if needed
    });
  };

  return (
    <Card
    title={
      <div className="cardHeader">
        {name}
        <DeleteOutlined onClick={handleDelete} className="deleteIcon" />

      </div>}

      className={`card ${isDragging ? 'cardDragging' : ''}`} 
      ref={drag}
    >
      {description}
    </Card>
  );
}
export default Cards;
