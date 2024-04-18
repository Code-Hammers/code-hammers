import React from "react";

interface Alum {
  name: string;
  company: string;
  email: string;
  linkedIn?: string;
  campus?: string;
  cohort: string | number;
  jobTitle?: string;
  industry?: string;
  cities: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  alum: Alum | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, alum }) => {
  if (!isOpen || !alum) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-6 rounded-lg max-w-lg w-full m-4 shadow-xl">
        <h2 className="text-2xl font-bold text-white">{alum.name}</h2>
        <p className="text-white">Company: {alum.company}</p>
        <p className="text-white">Email: {alum.email}</p>
        <p className="text-white">LinkedIn: {alum.linkedIn || "N/A"}</p>
        <p className="text-white">Campus: {alum.campus || "N/A"}</p>
        <p className="text-white">Cohort: {alum.cohort}</p>
        <p className="text-white">Job Title: {alum.jobTitle || "N/A"}</p>
        <p className="text-white">Industry: {alum.industry || "N/A"}</p>
        <p className="text-white">Cities: {alum.cities.join(", ")}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
