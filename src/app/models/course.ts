export interface Course {
    name: string;
    hours: number;
    percentageCompleted?: number;
    completionDate?: Date;
    selected?: boolean;
    active?: boolean;
}