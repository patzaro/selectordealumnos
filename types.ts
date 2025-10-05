export interface Student {
  id: string;
  name: string;
  confirmations: number;
}

export interface Course {
  id: string;
  name: string;
  studentIds: string[];
}
