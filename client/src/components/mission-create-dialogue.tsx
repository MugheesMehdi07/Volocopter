import React, { useState } from 'react';
import { Modal, Input, Button, Form, notification} from 'antd';
import { mission } from '../types/ticket';
import { addMission } from '../services/mission-service';

const { TextArea } = Input;

const CreateMissionDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose, setMissions }) => {
  const [formData, setFormData] = useState<mission>({ id: 0, name: '', description: '', status: "1" });

  const handleChange = (name: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const newMission:mission = await addMission(formData);
      console.log('Form data submitted:', newMission);
      notification.success({
        message: 'Success',
        description: 'Mission successfully created.',
        placement: 'bottom',
      });

      setMissions(prevMissions => [...prevMissions, newMission]);


      onClose();
    } catch (error) {
      console.error('Failed to create missions:', error);

      notification.error({
        message: 'Error',
        description: 'Error creating Mission.',
        placement: 'bottom',
      });

    }
  };

  return (
    <Modal
      title="Create New Mission"
      visible={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Create
        </Button>,
      ]}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input the mission name!' }]}
        >
          <Input
            autoFocus
            value={formData.name}
            onChange={(e) => handleChange('name', e)}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <TextArea
            rows={4}
            value={formData.description}
            onChange={(e) => handleChange('description', e)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateMissionDialog;
