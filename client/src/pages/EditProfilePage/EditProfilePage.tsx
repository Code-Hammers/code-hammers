import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from "../../features/userProfile/userProfileSlice";

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, status } = useAppSelector((state) => state.userProfile);
  const userID = useAppSelector((state) => state.user.userData?._id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: "",
    personalBio: "",
    nickname: "",
    firstname: "",
    lastname: "",
    cohort: "", 
    linkedin: "",
    skills: [] as String[],
  });

  const [skillInput, setSkillInput] = useState("");

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== "") {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, skillInput.trim()],
        }));
      }
      setSkillInput("");
    }
  };


  const handleSkillRemove = (skill: string) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((s) => s !== skill),
    }));
  };

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (userID) dispatch(fetchUserProfile(userID as string));
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email || "",
        personalBio: profile.personalBio || "",
        nickname: profile.nickname || "",
        firstname: profile.firstname || "",
        lastname: profile.lastname || "",
        cohort: profile.cohort || "",
        linkedin: profile.linkedin || "",
        skills: profile.skills || [],
      });
    }
  }, [profile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userID) {
      console.error("UserID is undefined.");
      return;
    }
    dispatch(updateUserProfile({ ...formData, userID, navigate }));
  };

  const handleImageUpload = () => {
    if (!file || !userID) {
      console.error("File or UserID is undefined.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    dispatch(uploadProfilePicture({ formData, userID }));
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  if (status === "loading" || !userID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen p-4 pt-20 text-white">
      <h1 className="font-extrabold mb-4 mt-16 text-4xl">Edit Profile</h1>
      <div className="bg-gradient-to-r flex flex-col from-gray-700 items-center max-w-4xl pb-6 pl-6 pr-6 pt-6 rounded-lg shadow-lg to-gray-900 via-gray-800 w-full">
        <form onSubmit={handleSubmit} className=" w-full">
          {profile?.profilePhoto && (
            <div className="mb-4 text-center">
              <img
                src={profile.profilePhoto}
                alt="Profile"
                className="h-32 mx-auto object-cover rounded-full w-32"
              />
            </div>
          )}
          <label className="block text-sm font-bold mb-2" htmlFor="firstname">
            First Name
            <input
            className="bg-gray-800 p-2 rounded text-white w-full"
            id="firstname"
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={handleChange}
            />
          </label>
          <label className="block text-sm font-bold mb-2" htmlFor="lastname">
            Last Name
            <input
            className="bg-gray-800 p-2 rounded text-white w-full"
            id="lastname"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={handleChange}
            />
          </label>
          <label className="block font-bold mb-2 text-sm" htmlFor="email">
            Email
            <input
              className="bg-gray-800 p-2 rounded text-white w-full"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className="block text-sm font-bold mb-2" htmlFor="nickname">
            Nickname
            <input
            className="bg-gray-800 p-2 rounded text-white w-full"
            id="nickname"
            name="nickname"
            type="text"
            value={formData.nickname}
            onChange={handleChange}
            />
          </label>
          <label className="block text-sm font-bold mb-2" htmlFor="cohor">
            Cohort
            <input
            className="bg-gray-800 p-2 rounded text-white w-full"
            id="cohort"
            name="cohort"
            type="text"
            value={formData.cohort}
            onChange={handleChange}
            />
          </label>
          <label className="block font-bold mb-2 text-sm" htmlFor="personalBio">
            Personal Bio
            <input
              className="bg-gray-800 p-2 rounded text-white w-full"
              id="personalBio"
              name="personalBio"
              type="text"
              value={formData.personalBio}
              onChange={handleChange}
            />
          </label>
          <label className="block font-bold mb-2 text-sm" htmlFor="linkedin">
            LinkedIn 
            <input
              className="bg-gray-800 p-2 rounded text-white w-full"
              id="linkedin"
              name="linkedin"
              type="text"
              value={formData.linkedin}
              onChange={handleChange}
            />
          </label>
          <label className="block font-bold mb-2 text-sm" htmlFor="skills">
            Skills 
            <input
              className="bg-gray-800 p-2 rounded text-white w-full"
              id="skills"
              name="skills"
              type="text"
              value={skillInput}
              onChange={handleSkillChange}
              onKeyDown={handleSkillKeyDown}
              placeholder="Type a skill and press Enter"
            />
          </label>

          <button
            className="bg-blue-500 font-bold hover:bg-blue-700 px-4 py-2 rounded text-white"
            type="submit"
          >
            Save Changes
          </button>
        </form>
        <div className="mt-6">
          <h3 className="font-bold mb-4 text-2xl">Upload Profile Picture</h3>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          {file && <p className="mt-2 text-lg">{file.name}</p>}
          <button
            className="bg-blue-500 font-bold hover:bg-blue-700 mr-2 mt-4 px-4 py-2 rounded text-white"
            onClick={handleFileInputClick}
          >
            Choose File
          </button>
          <button
            className="bg-blue-500 font-bold hover:bg-blue-700 ml-2 mt-4 px-4 py-2 rounded text-white"
            onClick={handleImageUpload}
          >
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
