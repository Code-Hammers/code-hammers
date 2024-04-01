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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-xs">
        {profile?.profilePhoto && (
          <div className="mb-4 text-center">
            <img
              src={profile.profilePhoto}
              alt="Profile"
              className="rounded-full h-32 w-32 object-cover mx-auto"
            />
          </div>
        )}
        <h2 className="text-4xl font-extrabold mb-4 text-center">
          Edit Profile
        </h2>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="personalBio"
            >
              Personal Bio
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="personalBio"
              name="personalBio"
              type="text"
              value={formData.personalBio}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
        <div>
          <h3 className="text-2xl font-bold mb-4">Upload Profile Picture</h3>
          <input type="file" onChange={handleFileChange} />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
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
