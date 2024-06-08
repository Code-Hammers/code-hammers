import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
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
    linkedInProfile: "",
    gitHubProfile: "",
    nickName: "",
    personalBio: "",
    skills: [] as string[],
    specializations: [] as string[],
    careerInformation: {
      currentPosition: {
        title: "",
        company: "",
      },
    },
    socialMediaLinks: {
      twitter: "",
      blog: "",
    },
    availabilityForNetworking: false,
  });

 

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (userID) dispatch(fetchUserProfile(userID as string));
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        cohort: profile.cohort || "",
        email: profile.email || "",
        linkedInProfile: profile.linkedInProfile || "",
        gitHubProfile: profile.gitHubProfile || "",
        nickName: profile.nickName || "",
        personalBio: profile.personalBio || "",
        skills: profile.skills || [],
        specializations: profile.specializations || [],
        careerInformation: {
          currentPosition: {
            title: profile.careerInformation?.currentPosition?.title || "",
            company: profile.careerInformation?.currentPosition?.company || "",
          },
        },
        socialMediaLinks: {
          twitter: profile.socialMediaLinks?.twitter || "",
          blog: profile.socialMediaLinks?.blog || "",
        },
        availabilityForNetworking: profile.availabilityForNetworking || false,
      });
    }
  }, [profile]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      careerInformation: {
        ...prevData.careerInformation,
        currentPosition: {
          ...prevData.careerInformation.currentPosition,
          company: value,
        },
      },
    }));
  };
  
 const [skillInput, setSkillInput] = useState("");

  const handleSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleSpecialization = (skill: string) => {
    if (!formData.specializations.includes(skill)) {
      setFormData((prevData) => ({
        ...prevData, 
        specializations: [...prevData.specializations, skill],
      }))
    }
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      const lowerCasedSkillInput = skillInput.trim().toLowerCase();
      const lowerCasedSkillSet = new Set(formData.skills.map(skill => skill.toLowerCase()));

      if (!lowerCasedSkillSet.has(lowerCasedSkillInput)) {
        setFormData((prevData) => ({
          ...prevData,
          skills: [...prevData.skills, skillInput.trim()],
        }));
      }
      setSkillInput("");
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

  // Handling the change for title
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      careerInformation: {
        ...prevData.careerInformation,
        currentPosition: {
          ...prevData.careerInformation.currentPosition,
          title: value,
        },
      },
    }));
  };

  const handleTwitterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialMediaLinks: {
        ...prevData.socialMediaLinks,
        twitter: value,
      },
    }));
  };

  const handleBlogChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      socialMediaLinks: {
        ...prevData.socialMediaLinks,
        blog: value,
      },
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
    const payload = {
      ...formData,
      careerInformation: {
        currentPosition: {
          company: formData.careerInformation.currentPosition.company,
          title: formData.careerInformation.currentPosition.title,
        },
      },
      socialMediaLinks: {
        twitter: formData.socialMediaLinks.twitter,
        blog: formData.socialMediaLinks.blog,
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

  const getDisplayName = () => {
    return profile?.nickName || profile?.firstName;
  };

  if (status === 'loading' || !userID) {
    return <div>Loading...</div>;
  }

  return (
    <div className='bg-gray-900 flex flex-col items-center justify-start min-h-screen p-4 pt-20 text-white'>
      <h1 className='font-extrabold mb-4 mt-16 text-4xl'>
        Hello {getDisplayName()}, Edit Your Profile Here
      </h1>
      <div className='bg-gradient-to-r flex flex-col from-gray-700 items-center max-w-4xl pb-6 pl-6 pr-6 pt-6 rounded-lg shadow-lg to-gray-900 via-gray-800 w-full'>
        <form onSubmit={handleSubmit} className=' w-full'>
          {profile?.profilePhoto && (
            <div className='mb-4 text-center'>
              <img
                src={profile.profilePhoto}
                alt='Profile'
                className='h-32 mx-auto object-cover rounded-full w-32'
              />
            </div>
          )}
          <label className='block font-bold mb-2 text-sm' htmlFor='email'>
            Email
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='email'
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <label className='block text-sm font-bold mb-2' htmlFor='nickName'>
            Nickname
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='nickName'
              name='nickName'
              type='text'
              value={formData.nickName}
              onChange={handleChange}
            />
          </label>
          <label className='block font-bold mb-2 text-sm' htmlFor='cohort'>
            Cohort
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='cohort'
              name='cohort'
              type='text'
              value={formData.cohort}
              onChange={handleChange}
            />
          </label>
          <label className='block font-bold mb-2 text-sm' htmlFor='personalBio'>
            Personal Bio
            <textarea
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='personalBio'
              name='personalBio'
              value={formData.personalBio}
              onChange={handleChange}
              style={{ maxHeight: "200px" }}
              maxLength={1000}
            />
          </label>
          <label className='block font-bold mb-2 text-sm' htmlFor='company'>
            Current Company
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='company'
              name='company'
              type='text'
              value={formData.careerInformation.currentPosition.company}
              onChange={handleCompanyChange}
            />
          </label>
          <label className='block font-bold mb-2 text-sm' htmlFor='title'>
            Current Title
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='title'
              name='title'
              type='text'
              value={formData.careerInformation.currentPosition.title}
              onChange={handleTitleChange}
            />
          </label>

          <label
            className='block font-bold mb-2 text-sm'
            htmlFor='availabilityForNetworking'
          >
            Available for Networking?
            <div
              className={`cursor-pointer h-3 inline-block ml-2 mt-2 w-3 ${
                formData.availabilityForNetworking
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
              role='button'
              tabIndex={0}
              onClick={() =>
                setFormData((prevData) => ({
                  ...prevData,
                  availabilityForNetworking:
                    !prevData.availabilityForNetworking,
                }))
              }
            ></div>
            <span className="ml-2 text-xs">
              {formData.availabilityForNetworking ? 'Yes' : 'No'}
            </span>
          </label>

          <label
            className='block font-bold mb-2 text-sm'
            htmlFor='linkedInProfile'
          >
            LinkedIn
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='linkedInProfile'
              name='linkedInProfile'
              type='text'
              value={formData.linkedInProfile}
              onChange={handleChange}
            />
          </label>
          <label
            className='block font-bold mb-2 text-sm'
            htmlFor='gitHubProfile'
          >
            GitHub
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='gitHubProfile'
              name='gitHubProfile'
              type='text'
              value={formData.gitHubProfile}
              onChange={handleChange}
            />
          </label>
          <label className='block font-bold mb-2 text-sm' htmlFor='twitter'>
            Twitter
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='twitter'
              name='twitter'
              type='text'
              value={formData.socialMediaLinks.twitter}
              onChange={handleTwitterChange}
            />
          </label>
          <label className='block font-bold mb-2 text-sm' htmlFor='blog'>
            Blog
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='blog'
              name='blog'
              type='text'
              value={formData.socialMediaLinks.blog}
              onChange={handleBlogChange}
            />
          </label>
          <label className='block font-bold mb-2 text-sm' htmlFor='skills'>
            Skills
            <input
              className='bg-gray-800 p-2 rounded text-white w-full'
              id='skills'
              name='skills'
              type='text'
              value={skillInput}
              onChange={handleSkillChange}
              onKeyDown={handleSkillKeyDown}
              placeholder='Type a skill and press Enter'
            />
          </label>
          <div className='flex flex-wrap gap-2 mb-2 mt-4'>
            {formData.skills.map((skill, index) => (
              <div
                key={index}
                className='mb-2 mr-2 '
                onClick={() => handleSpecialization(skill)}
              >
                <span
                  // kept to avoid key warning
                  key={index}
                  className='bg-blue-500 incline-flex items-center px-4 py-1 rounded-full text-sm text-white'
                >
                  {skill}
                  <button
                    type='button'
                    className='ml-2 text-white'
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

          <label
            className='block font-bold mb-2 text-sm'
            htmlFor='specializations'
          >
            Specializations
            <span className='ml-2 text-gray-500 text-xs'>
              click on the skills you specialize in
            </span>
          </label>

          <div className='flex flex-wrap gap-2 mt-4 mb-2'>
            {formData.specializations.map((skill, index) => (
              <div key={index} className='mb-2 mr-2 '>
                <span
                  // kept to avoid key warning
                  key={index}
                  className='bg-yellow-500 incline-flex items-center px-4 py-1 rounded-full text-black text-sm'
                >
                  {skill}
                  <button
                    type='button'
                    className='ml-2 text-black'
                    onClick={() => handleSkillRemove(skill, true)}
                  >
                    {/* HTML entity for multiplication sign */}
                    &times;
                  </button>
                </span>
              </div>
            ))}
          </div>

          <button
            className='bg-blue-500 font-bold hover:bg-blue-700 mt-4 px-4 py-2 rounded text-white'
            type='submit'
          >
            Save Changes
          </button>
        </form>
        <div className='mt-6'>
          <h3 className='font-bold mb-4 text-2xl'>Upload Profile Picture</h3>
          <input
            ref={fileInputRef}
            type='file'
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {file && <p className='mt-2 text-lg'>{file.name}</p>}
          <button
            className='bg-blue-500 font-bold hover:bg-blue-700 mr-2 mt-4 px-4 py-2 rounded text-white'
            onClick={handleFileInputClick}
          >
            Choose File
          </button>
          <button
            className='bg-blue-500 font-bold hover:bg-blue-700 ml-2 mt-4 px-4 py-2 rounded text-white'
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
