import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { IProfile } from "../../../types/profile";

interface ProfileThumbProps {
  profile: IProfile;
}

const ProfileThumb = ({ profile }: ProfileThumbProps): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-extrabold mb-4">{profile.firstName}</h1>
      <h2 className="text-4xl font-extrabold mb-4">{profile.bio}</h2>
    </div>
  );
};

export default ProfileThumb;
