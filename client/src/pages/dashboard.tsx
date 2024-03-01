import { Button, Typography, Layout } from "antd";
import { Board } from "../components/board";
import CreateMissionDialog from "../components/mission-create-dialogue";
import { useState } from "react";
import "../styles/dashboard.css";
import { mission } from '../types/ticket';

const { Header, Content } = Layout;

const Dashboard: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState<boolean>(false);
  const [missions, setMissions] = useState<mission[]>([]); 

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <Layout>
      <Header className="dashboardContainer">
        <Typography.Title level={2}>
          Flight Mission Control Tool
        </Typography.Title>
        <Button type="primary" onClick={handleOpenPopup}>
          Create New Mission
        </Button>
        <CreateMissionDialog open={isPopupOpen} onClose={handleClosePopup} setMissions={setMissions} />
      </Header>
      <Content className="boardContainer">
        <Board missions = {missions} setMissions = {setMissions}/>
      </Content>
    </Layout>
  );
};

export default Dashboard;
