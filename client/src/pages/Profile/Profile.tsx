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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start pt-20 p-4">
      <h1 className="text-4xl font-extrabold mb-4 mt-16">Profile</h1>
      <div className="w-full max-w-4xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 pt-6 pb-6 pl-6 pr-6 rounded-lg shadow-lg flex flex-col items-center">
        <img
          src={userProfile?.profilePhoto || 'https://picsum.photos/200'}
          alt="Profile"
          className="rounded-full h-32 w-32 object-cover mb-4 mt-4"
        />
        <h2 className="text-xl font-bold mb-2">
          {userProfile?.firstName} {userProfile?.lastName}
        </h2>
        <h3>{userProfile?.cohort}</h3>
        <p className="text-lg mb-4">{userProfile?.personalBio}</p>
      </div>
    </div>
  );
};

export default Profile;
