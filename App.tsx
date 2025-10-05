import React, { useState, useMemo } from 'react';
import { COURSES as COURSE_TEMPLATES } from './constants';
import type { Course, Student } from './types';
import SelectInput from './components/SelectInput';
import StudentCard from './components/StudentCard';
import FileUpload from './components/FileUpload';

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentsLoaded, setStudentsLoaded] = useState<boolean>(false);
  const [isConfirmedChecked, setIsConfirmedChecked] = useState<boolean>(false);

  const handleFileLoad = (loadedStudents: Student[]) => {
    setStudents(loadedStudents);

    // Distribute students among the courses
    const updatedCourses = COURSE_TEMPLATES.map(course => ({
        ...course,
        studentIds: [],
    }));

    loadedStudents.forEach((student, index) => {
        const courseIndex = index % updatedCourses.length;
        updatedCourses[courseIndex].studentIds.push(student.id);
    });

    setCourses(updatedCourses);
    setStudentsLoaded(true);
  };

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    setSelectedStudentId('');
    setSelectedStudent(null);
    setIsConfirmedChecked(false);
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentId = e.target.value;
    setSelectedStudentId(studentId);
    const student = students.find(s => s.id === studentId) || null;
    setSelectedStudent(student);
    setIsConfirmedChecked(false);
  };

  const handleConfirm = () => {
    if (!selectedStudentId || !isConfirmedChecked) return;

    const updatedStudents = students.map(student => 
      student.id === selectedStudentId 
        ? { ...student, confirmations: student.confirmations + 1 }
        : student
    );
    setStudents(updatedStudents);

    const updatedSelectedStudent = updatedStudents.find(s => s.id === selectedStudentId) || null;
    setSelectedStudent(updatedSelectedStudent);

    setIsConfirmedChecked(false);
  };

  const availableStudents = useMemo(() => {
    if (!selectedCourseId) {
      return [];
    }
    const selectedCourse = courses.find(c => c.id === selectedCourseId);
    if (!selectedCourse) {
      return [];
    }
    return students.filter(student => selectedCourse.studentIds.includes(student.id));
  }, [selectedCourseId, courses, students]);

  const courseOptions = useMemo(() => courses.map(c => ({ value: c.id, label: c.name })), [courses]);
  const studentOptions = useMemo(() => availableStudents.map(s => ({ value: s.id, label: s.name })), [availableStudents]);

  return (
    <div className="bg-slate-100 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md">
        {!studentsLoaded ? (
           <FileUpload onFileLoad={handleFileLoad} />
        ) : (
          <>
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800">Selector de Alumnos</h1>
              <p className="text-slate-600 mt-2">Elige un curso para ver los alumnos matriculados</p>
            </header>
            <main className="bg-white rounded-xl shadow-lg p-6 md:p-8 space-y-6">
              <SelectInput
                id="course-select"
                label="Elige un Curso"
                value={selectedCourseId}
                onChange={handleCourseChange}
                options={courseOptions}
                placeholder="Seleccionar curso..."
              />
              <SelectInput
                id="student-select"
                label="Elige un Alumno"
                value={selectedStudentId}
                onChange={handleStudentChange}
                options={studentOptions}
                placeholder="Seleccionar alumno..."
                disabled={!selectedCourseId || availableStudents.length === 0}
              />
            </main>
            {selectedStudent && (
              <footer className="mt-8 space-y-4">
                 <StudentCard student={selectedStudent} courseName={courses.find(c => c.id === selectedCourseId)?.name || ''} />
                 <div className="bg-white rounded-xl shadow-lg p-4 flex items-center justify-between animate-fade-in-up transition-all duration-500">
                    <div className="flex items-center">
                         <input 
                            id="confirm-checkbox"
                            type="checkbox" 
                            checked={isConfirmedChecked}
                            onChange={(e) => setIsConfirmedChecked(e.target.checked)}
                            className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                         />
                         <label htmlFor="confirm-checkbox" className="ml-3 text-sm font-medium text-slate-700 cursor-pointer">Marcar para confirmar</label>
                    </div>
                    <button 
                        onClick={handleConfirm}
                        disabled={!isConfirmedChecked}
                        className="px-5 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        Confirmar
                    </button>
                 </div>
              </footer>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;