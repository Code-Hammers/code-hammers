import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUserProfile } from '../../features/userProfile/userProfileSlice';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const userProfile = useAppSelector((state) => state.userProfile.profile);

  useEffect(() => {
    if (userId) dispatch(fetchUserProfile(userId));
  }, [dispatch, userId]);


  const {
    profilePhoto, 
    firstName,
    lastName, 
    cohort, 
    careerInformation,
    availabilityForNetworking,
    personalBio,
    skills,
    specializations, 
    gitHubProfile, 
    linkedInProfile,
    socialMediaLinks,
  } = userProfile || {};

  const position = careerInformation?.currentPosition;
  const networkingStatus = availabilityForNetworking 
    ? <h1 className='text-yellow-200 text-sm'>I'm available for networking!</h1>
    : <h1 className='text-red-200 text-sm'>I'm not available for networking right now</h1>;

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen p-4 pt-20 text-white">
      <h1 className="font-extrabold mb-4 mt-16 text-4xl">Profile</h1>  
      <div className="bg-gradient-to-r from-gray-700 flex flex-col items-center max-w-4xl pb-6 pl-6 pr-6 pt-6 rounded-lg shadow-lg to-gray-900 via-gray-800 w-full">
        <img
          src={profilePhoto || 'https://picsum.photos/200'}
          alt="Profile"
          className="h-32 mb-4 mt-4 object-cover rounded-full w-32"
        />
        <h2 className="font-bold mb-1 text-blue-500 text-xl">
          {firstName} {lastName} [{cohort}]
        </h2>
        <h2 className="mb-2 text-base">
          {position?.title} @ {position?.company}
        </h2>
        <p className="mb-4 rounded-lg text-base">{personalBio}</p>
        <div className='flex justify-center mb-4 pb-0 space-x-4 w-full '>
        <div className='bg-gray-800 border-2 flex-1 p-4 rounded-lg'>
          <h2 className='font-bold mb-2 text-center text-xl'>Skills</h2>
          <ul className='flex flex-wrap gap-2 justify-center list-inside'>
            {skills?.map((skill: string) => (
              <li className='bg-blue-500 inline-flex items-center px-4 py-1 rounded-full text-sm text-white'>
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className= 'bg-gray-800 border-2 flex-1 p-4 rounded-lg'>
            <h2 className='font-bold mb-2 text-center text-xl'>Specializations</h2>
            <ul className='flex flex-wrap gap-2 justify-center list-inside'>
            {specializations?.map((specialization: string) => (
              <li className='bg-yellow-500 inline-flex items-center px-4 py-1 rounded-full text-sm text-black'>
                {specialization}
              </li>
            ))}
          </ul>
        </div>
        </div>
        <div className='flex flex-col items-center justify-center mt-2'>
          <h1 className='font-bold text-xl'>Socials</h1>
          {networkingStatus}
        </div>
      </div>
    </div>
  );
};

export default Profile;
