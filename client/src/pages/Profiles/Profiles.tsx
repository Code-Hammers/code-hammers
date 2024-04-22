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
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-start pt-20 p-4">
        <h1 className="text-4xl font-extrabold mb-4 mt-16">PROFILES</h1>

        <div className="w-full max-w-6xl p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <Link
              to={`/app/profile/${profile.user}`}
              key={index}
              className="shadow-lg rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl"
            >
              <ProfileThumb profile={profile} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profiles;
