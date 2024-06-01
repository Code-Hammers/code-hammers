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
    cohort: "",
    email: "",
    firstName: "",
    linkedin: "",
    nickname: "",
    personalBio: "",
    skills: [] as String[],
  });

  // THIS MIGHT BE ABLE TO BE REPLACED BY ALREADY EXSITING CODE
  // State for skills input
  const [skillInput, setSkillInput] = useState("");

  // THIS MIGHT BE ABLE TO BE REPLACED BY ALREADY EXSITING CODE
  // Handling the addition of characters in the "Skills" field
  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  // Handling the addition of a new skill
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== "") {
      e.preventDefault();
      console.log('handleSkillKeyDown')
      // ensuring the current skills array does not already include the typed skill
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, skillInput.trim()],
        }));
      }
      // emptying the Skill input box when typed skill is officially added
      setSkillInput("");
    }
  };

  // Handling the removal of a skill
  const handleSkillRemove = (skill: string) => {
    console.log("handleSkillRemove")
    setFormData((prevData) => ({
      ...prevData,
      // Filtering skills array to no longer include the removed skill
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
        cohort: profile.cohort || "",
        email: profile.email || "",
        firstName: profile.firstName || "",
        linkedin: profile.linkedin || "",
        nickname: profile.nickname || "",
        personalBio: profile.personalBio || "",
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

  const getDisplayName = () => {
    console.log('PROFILE HERE', profile);
    return profile?.nickname || profile?.firstName;
  }

  if (status === "loading" || !userID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen p-4 pt-20 text-white">
      <h1 className="font-extrabold mb-4 mt-16 text-4xl">Hello {getDisplayName()}, Edit Your Profile Here</h1>
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
          <div className="mt-4 flex flex-wrap gap-2">
            {formData.skills.map((skill, index) => (
              <div key={index} className="mr-2 mb-2">
              <span
             // kept to avoid key warning
                key={index}
                className="bg-blue-500 incline-flex items-center px-4 py-1 rounded-full text-sm text-white"
              >
                {skill}
                <button
                type="button"
                className="ml-2 text-white"
                onClick={() => handleSkillRemove(skill)}
                >
                  {/* HTML entity for multiplication sign */}
                  &times;
                  </button>
                </span>
              </div>
            ))}
          </div>

          <button
            className="bg-blue-500 font-bold hover:bg-blue-700 mt-4 px-4 py-2 rounded text-white"
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
