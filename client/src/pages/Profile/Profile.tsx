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
  }, [dispatch]);
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen p-4 pt-20 text-white">
      <h1 className="font-extrabold mb-4 mt-16 text-4xl">Profile</h1>
      <div className="bg-gradient-to-r flex flex-col from-gray-700 items-center max-w-4xl pb-6 pl-6 pr-6 pt-6 rounded-lg shadow-lg to-gray-900 via-gray-800 w-full">
        <img
          src={userProfile?.profilePhoto || 'https://picsum.photos/200'}
          alt="Profile"
          className="h-32 mb-4 mt-4 object-cover rounded-full w-32"
        />
        <h2 className="font-bold mb-1 text-xl">
          {userProfile?.firstName} {userProfile?.lastName}
        </h2>
        <h3 className='text-m'>{userProfile?.cohort}</h3>
        <h2 className="font-bold mb-2 text-l">
          {userProfile?.careerInformation?.currentPosition?.title} @ {userProfile?.careerInformation?.currentPosition?.company}
        </h2>
        
        <p className="mb-4 text-lg">{userProfile?.personalBio}</p>
      </div>
    </div>
  );
};

export default Profile;
