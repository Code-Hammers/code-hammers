import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from "../../features/userProfile/userProfileSlice";

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const { profile, status } = useAppSelector((state) => state.userProfile);
  const userID = useAppSelector((state) => state.user.userData?._id);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    personalBio: "",
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (userID) dispatch(fetchUserProfile(userID as string));
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        personalBio: profile.personalBio || "",
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
    dispatch(updateUserProfile({ ...formData, userID }));
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

  if (status === "loading" || !userID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start pt-20 p-4">
      <h1 className="text-4xl font-extrabold mb-4 mt-16">Edit Profile</h1>
      <div className="w-full max-w-4xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 pt-6 pb-6 pl-6 pr-6 rounded-lg shadow-lg flex flex-col items-center">
        <form onSubmit={handleSubmit} className=" w-full">
          {profile?.profilePhoto && (
            <div className="mb-4 text-center">
              <img
                src={profile.profilePhoto}
                alt="Profile"
                className="rounded-full h-32 w-32 object-cover mx-auto"
              />
            </div>
          )}
          <label className="block text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
            <input
              className="w-full p-2 rounded bg-gray-800 text-white"
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
          </label>
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
            <input
              className="w-full p-2 rounded bg-gray-800 text-white"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className="block text-sm font-bold mb-2" htmlFor="personalBio">
            Personal Bio
            <input
              className="w-full p-2 rounded bg-gray-800 text-white"
              id="personalBio"
              name="personalBio"
              type="text"
              value={formData.personalBio}
              onChange={handleChange}
            />
          </label>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Save Changes
          </button>
        </form>
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">Upload Profile Picture</h3>
          <input type="file" onChange={handleFileChange} />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
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
