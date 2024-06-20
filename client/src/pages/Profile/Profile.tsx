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
      <div className="bg-gradient-to-r flex flex-col from-gray-700 items-center max-w-4xl pb-6 pl-6 pr-6 pt-6 rounded-lg shadow-lg to-gray-900 via-gray-800 w-full">
        <img
          src={profilePhoto || 'https://picsum.photos/200'}
          alt="Profile"
          className="h-32 mb-4 mt-4 object-cover rounded-full w-32"
        />
        <h2 className="font-bold mb-1 text-xl">
          {firstName} {lastName}
        </h2>
        <h3 className='text-m'>{cohort}</h3>
        <h2 className="font-bold mb-2 text-l">
          {position?.title} @ {position?.company}
        </h2>
        <h3 className="font-bold mb-2 text-xs">
          {networkingStatus}
        </h3>
        <p className="mb-4 text-s">{personalBio}</p>
      </div>
    </div>
  );
};

export default Profile;
