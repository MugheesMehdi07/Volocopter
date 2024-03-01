import { mission } from '../types/ticket';
import axiosInstance from './axios-instance';

export const fetchMissions = async () => {
    const response = await axiosInstance.get<mission[]>('/get_missions');
    return response.data;
};

export const fetchMissionById = (id: string) => {
  return axiosInstance.get(`/mission/${id}`);
};

export const addMission = async(missionData: mission) => {

    const response = await axiosInstance.post('/mission', missionData);
    return response.data['new_mission'];
};

export const updateMission = async(missionData: mission) => {

    const response = await axiosInstance.put(`/mission/${missionData.id}`, missionData);
    return response.data;
};

export const deleteMission = async (id: number) => {
  const response = await axiosInstance.delete(`/mission/${id}`);
  return response.data;
}
