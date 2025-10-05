import type { Course } from './types';

export const COURSES: Omit<Course, 'studentIds'>[] = [
  {
    id: 'c1',
    name: 'Matemáticas Avanzadas',
  },
  {
    id: 'c2',
    name: 'Historia del Arte',
  },
  {
    id: 'c3',
    name: 'Programación en React',
  },
  {
    id: 'c4',
    name: 'Química Orgánica',
  }
];
