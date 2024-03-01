export interface mission {
    id : number;
    name: string;
    description: string;
    status: string;
}

export interface missionList{
    title: string;
    tickets: mission[];
}