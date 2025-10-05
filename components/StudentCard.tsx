import React from 'react';
import type { Student } from '../types';

interface StudentCardProps {
  student: Student;
  courseName: string;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, courseName }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in-up transition-all duration-500">
        <style>
            {`
                @keyframes fade-in-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out forwards;
                }
            `}
        </style>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <img className="h-16 w-16 rounded-full object-cover border-4 border-indigo-200" src={`https://picsum.photos/seed/${student.id}/100`} alt={`${student.name}`} />
        </div>
        <div>
            <div className="flex items-center space-x-2 mb-1">
                 <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
                 <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {student.confirmations}
                </span>
            </div>
          <p className="text-sm text-slate-600">Matriculado/a en:</p>
          <p className="text-md font-semibold text-indigo-600">{courseName}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;