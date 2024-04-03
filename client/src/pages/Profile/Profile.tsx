import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUserProfile } from "../../features/userProfile/userProfileSlice";

const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const userProfile = useAppSelector((state) => state.userProfile.profile);

  useEffect(() => {
    console.log("userId", userId);
    if (userId) dispatch(fetchUserProfile(userId));
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Profile</h1>
      <h2 className="text-4xl font-extrabold mb-4">
        {userProfile?.user.toString()}
      </h2>
      <h2 className="text-4xl font-extrabold mb-4">{userProfile?.fullName}</h2>
    </div>
  );
};

export default Profile;
