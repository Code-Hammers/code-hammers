import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from '../../features/userProfile/userProfileSlice';

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, status } = useAppSelector((state) => state.userProfile);
  const userID = useAppSelector((state) => state.user.userData?._id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    email: '',
    personalBio: '',
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (userID) dispatch(fetchUserProfile(userID as string));
  }, [dispatch]);
  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email || '',
        personalBio: profile.personalBio || '',
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
      console.error('UserID is undefined.');
      return;
    }
    dispatch(updateUserProfile({ ...formData, userID, navigate }));
  };

  const handleImageUpload = () => {
    if (!file || !userID) {
      console.error('File or UserID is undefined.');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', file);

    dispatch(uploadProfilePicture({ formData, userID }));
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  if (status === 'loading' || !userID) {
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
            style={{ display: 'none' }}
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
