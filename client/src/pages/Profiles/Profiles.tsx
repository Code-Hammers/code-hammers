import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProfiles } from "../../features/profiles/profilesSlice";
import ProfileThumb from "../../components/ProfileThumb/ProfileThumb";

const Profiles = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const profiles = useAppSelector((state) => state.profiles.profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold mb-4">PROFILES</h1>
      </div>
      <div>
        {profiles.map((profile, index) => (
          <Link to={`/app/profile/${profile.user}`} key={index}>
            <ProfileThumb profile={profile} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Profiles;
