import React, { useState, useCallback } from 'react';
import type { Student } from '../types';
import UploadIcon from './icons/UploadIcon';

interface FileUploadProps {
    onFileLoad: (students: Student[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoad }) => {
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const processText = useCallback((text: string) => {
        setError(null);
        const names = text.split('\n').map(name => name.trim()).filter(name => name.length > 0);
        
        if (names.length === 0) {
            setError('El archivo está vacío o no contiene nombres válidos.');
            return;
        }
        
        const students: Student[] = names.map((name, index) => ({
            id: `s${index + 1}`,
            name,
            confirmations: 0,
        }));
        onFileLoad(students);
    }, [onFileLoad]);

    const processFile = useCallback((file: File) => {
        if (file && file.type === 'text/plain') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                if (text) {
                    processText(text);
                }
            };
            reader.onerror = () => {
                setError('Error al leer el archivo.');
            };
            reader.readAsText(file);
        } else {
            setError('Por favor, sube un archivo de texto plano (.txt).');
        }
    }, [processText]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };
    
    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
           processFile(file);
        }
    };

    const handleUseSampleData = async () => {
        setError(null);
        try {
            const response = await fetch('/listado.txt');
            if (!response.ok) {
                throw new Error('No se pudo cargar el archivo de ejemplo.');
            }
            const text = await response.text();
            processText(text);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido al cargar datos de ejemplo.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto text-center">
             <h1 className="text-4xl font-bold text-slate-800 mb-2">Cargar Alumnos</h1>
             <p className="text-slate-600 mb-8">Sube un archivo .txt con la lista de nombres</p>
             <label
                htmlFor="file-upload"
                onDragEnter={handleDragEnter}
                onDragOver={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed rounded-lg cursor-pointer bg-white ${isDragging ? 'border-indigo-500' : 'border-slate-300'} hover:border-indigo-400 transition-colors duration-300`}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Haz click para subir</span> o arrastra el archivo</p>
                    <p className="text-xs text-slate-500">Archivo .TXT (un nombre por línea)</p>
                </div>
                <input id="file-upload" type="file" className="hidden" accept=".txt" onChange={handleFileChange} />
            </label>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <div className="mt-6 text-center">
                 <p className="text-sm text-slate-500 mb-2">¿No tienes un archivo a mano?</p>
                 <button 
                     onClick={handleUseSampleData}
                     className="px-5 py-2 text-sm bg-indigo-100 text-indigo-700 font-semibold rounded-md shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                 >
                     Usar datos de ejemplo
                 </button>
             </div>
        </div>
    );
};

export default FileUpload;