export interface Course {
    id: string;
    name: string;
    hours: number;
    percentageCompleted?: number;
    completionDate?: Date;
    selected?: boolean;
    active?: boolean;
}