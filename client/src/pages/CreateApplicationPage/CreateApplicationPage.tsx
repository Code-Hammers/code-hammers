import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector } from "../../app/hooks";
import { IApplication } from "../../../types/applications";

const CreateApplicationPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.user.userData);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    url: "",
    status_id: "",
    quick_apply: false,
    date_applied: new Date().toISOString().split("T")[0],
    general_notes: "",
  });

  //TODO build useEffect to get statuses

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="pt-40 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-4">Create Applications</h1>
      <form className="w-full max-w-lg">
        <label className="block text-sm font-bold mb-2" htmlFor="title">
          Job Title
          <input
            className="w-full p-2 rounded bg-gray-800 text-white"
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Application
        </button>
      </form>
    </div>
  );
};

export default CreateApplicationPage;
