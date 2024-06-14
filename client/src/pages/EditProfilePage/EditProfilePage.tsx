import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from '../../features/userProfile/userProfileSlice';
import EditProfileInput from '../../components/ProfileInput/ProfileInput';

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { profile, status } = useAppSelector((state) => state.userProfile);
  const userID = useAppSelector((state) => state.user.userData?._id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  type FormDataType = {
    email: string;
    nickName: string;
    cohort: string;
    personalBio: string;
    currentPositionTitle: string;
    currentPositionCompany: string;
    availabilityForNetworking: boolean;
    linkedInProfile: string;
    gitHubProfile: string;
    twitter: string;
    blog: string;
    skills: string[];
    specializations: string[];
  };

  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    nickName: '',
    cohort: '',
    personalBio: '',
    currentPositionTitle: '',
    currentPositionCompany: '',
    availabilityForNetworking: false,
    linkedInProfile: '',
    gitHubProfile: '',
    twitter: '',
    blog: '',
    skills: [] as string[],
    specializations: [] as string[],
  });

  const [skillInput, setSkillInput] = useState('');

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (userID) dispatch(fetchUserProfile(userID as string));
  }, [dispatch, userID]);

  useEffect(() => {
    if (profile) {
      setFormData({
        email: profile.email || '',
        nickName: profile.nickName || '',
        cohort: profile.cohort || '',
        personalBio: profile.personalBio || '',
        currentPositionTitle: profile.careerInformation?.currentPosition?.title || '',
        currentPositionCompany: profile.careerInformation?.currentPosition?.company || '',
        availabilityForNetworking: profile.availabilityForNetworking || false,
        linkedInProfile: profile.linkedInProfile || '',
        gitHubProfile: profile.gitHubProfile || '',
        twitter: profile.socialMediaLinks?.twitter || '',
        blog: profile.socialMediaLinks?.blog || '',
        skills: profile.skills || [],
        specializations: profile.specializations || [],
      });
    }
  }, [profile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSkillInput(e.target.value);
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && skillInput.trim() !== '') {
      e.preventDefault();
      const lowerCasedSkillInput = skillInput.trim().toLowerCase();
      const lowerCasedSkillSet = new Set(formData.skills.map((skill) => skill.toLowerCase()));

      if (!lowerCasedSkillSet.has(lowerCasedSkillInput)) {
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, skillInput.trim()],
        }));
      }
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skill: string, specialty: boolean) => {
    if (specialty) {
      setFormData((prevData) => ({
        ...prevData,
        specializations: prevData.specializations.filter((s) => s !== skill),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        skills: prevData.skills.filter((s) => s !== skill),
      }));
    }
  };

  const handleSpecialization = (skill: string) => {
    if (!formData.specializations.includes(skill)) {
      setFormData((prevData) => ({
        ...prevData,
        specializations: [...prevData.specializations, skill],
      }));
    }
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
    const payload = {
      ...formData,
      careerInformation: {
        currentPosition: {
          company: formData.currentPositionTitle,
          title: formData.currentPositionCompany,
        },
      },
      socialMediaLinks: {
        twitter: formData.twitter,
        blog: formData.blog,
      },
    };
    dispatch(updateUserProfile({ ...payload, userID, navigate }));
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
      <h1 className="font-extrabold mb-4 mt-16 text-4xl">
        Hello {profile?.nickName || profile?.firstName}, Edit Your Profile Here
      </h1>
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
          <EditProfileInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Nickname"
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Cohort"
            type="text"
            name="cohort"
            value={formData.cohort}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Personal Bio"
            type="textarea"
            name="personalBio"
            value={formData.personalBio}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Current Company"
            type="text"
            name="currentPositionCompany"
            value={formData.currentPositionCompany}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Current Title"
            type="text"
            name="currentPositionTitle"
            value={formData.currentPositionTitle}
            onChange={handleChange}
          />
          <label className="block font-bold mb-2 text-sm" htmlFor="availabilityForNetworking">
            Available for Networking?
            <div
              className={`cursor-pointer h-3 inline-block ml-2 mt-2 w-3 ${
                formData.availabilityForNetworking ? 'bg-yellow-500' : 'bg-blue-500'
              }`}
              role="button"
              tabIndex={0}
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  availabilityForNetworking: !prevData.availabilityForNetworking,
                }))
              }
            ></div>
            <span className="ml-2 text-xs">
              {formData.availabilityForNetworking ? 'Yes' : 'No'}
            </span>
          </label>
          <EditProfileInput
            label="LinkedIn"
            type="text"
            name="linkedInProfile"
            value={formData.linkedInProfile}
            onChange={handleChange}
          />
          <EditProfileInput
            label="GitHub"
            type="text"
            name="gitHubProfile"
            value={formData.gitHubProfile}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Twitter"
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Blog"
            type="text"
            name="blog"
            value={formData.blog}
            onChange={handleChange}
          />
          <EditProfileInput
            label="Skills"
            type="text"
            name="skills"
            value={skillInput}
            onChange={handleSkillChange}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter"
          />
          <div className="flex flex-wrap gap-2 mb-2 mt-4">
            {formData.skills.map((skill, index) => (
              <div key={index} className="mb-2 mr-2 " onClick={() => handleSpecialization(skill)}>
                <span
                  className="bg-blue-500 incline-flex items-center px-4 py-1 rounded-full text-sm text-white"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-2 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSkillRemove(skill, false);
                    }}
                  >
                    {/* HTML entity for multiplication sign */}
                    &times;
                  </button>
                </span>
              </div>
            ))}
          </div>
          <label className="block font-bold mb-2 text-sm" htmlFor="specializations">
            Specializations
            <span className="ml-2 text-gray-500 text-xs">
              click on the skills you specialize in
            </span>
          </label>
          <div className="flex flex-wrap gap-2 mt-4 mb-2">
            {formData.specializations.map((skill, index) => (
              <div key={index} className="mb-2 mr-2 ">
                <span
                  className="bg-yellow-500 incline-flex items-center px-4 py-1 rounded-full text-black text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-2 text-black"
                    onClick={() => handleSkillRemove(skill, true)}
                  >
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
