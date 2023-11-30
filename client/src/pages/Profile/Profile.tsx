import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchUserProfile } from "../../features/userProfile/userProfileSlice";

const Profile = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.userProfile.profile);
  const user = useAppSelector((state) => state.user.userData);

  const userID = "6565448a110e293f3bf5d6fc";
  useEffect(() => {
    dispatch(fetchUserProfile(user._id));
  }, [dispatch]);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">Profile</h1>
      <h2 className="text-4xl font-extrabold mb-4">{user._id}</h2>
    </div>
  );
};

export default Profile;
