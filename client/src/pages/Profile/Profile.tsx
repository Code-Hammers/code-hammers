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
  } = userProfile || {};

  const position = careerInformation?.currentPosition;
  const networkingStatus = availabilityForNetworking 
    ? `I'm available for networking!`
    : `I'm not available for networking right now`;

  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen p-4 pt-20 text-white">
      <h1 className="font-extrabold mb-4 mt-16 text-4xl">Profile</h1>  
      <div className="bg-gradient-to-r from-gray-700 flex flex-col items-center max-w-4xl pb-6 pl-6 pr-6 pt-6 rounded-lg shadow-lg to-gray-900 via-gray-800 w-full">
        <img
          src={profilePhoto || 'https://picsum.photos/200'}
          alt="Profile"
          className="h-32 mb-4 mt-4 object-cover rounded-full w-32"
        />
        <h2 className="font-bold mb-1 text-xl">
          {firstName} {lastName} [{cohort}]
        </h2>
        <h2 className="mb-2 text-base">
          {position?.title} @ {position?.company}
        </h2>
        <h3 className="mb-2 text-sm">
          {networkingStatus}
        </h3>
        <p className="mb-4 text-base bg-gray-700 rounded-lg">{personalBio}</p>
        <div className='flex w-full space-x-4 mb-4'>
        <div className='flex-1 ml-10 bg-gray-800 p-4 rounded-lg border-red-500 border-2'>
          <h2 className='font-bold mb-2 text-xl text-center'>Skills</h2>
        </div>
        <div className= 'flex-1 ml-10 bg-gray-800 p-4 rounded-lg border-red-500 border-2'>
            <h2 className='font-bold mb-2 text-xl text-center'>Specializations</h2>
        </div>
        </div>
        <div className='flex-1 justify-center space-x-4 mt-4 border-red-500 border-2'>
          <h1>Socials</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
