import { IProfile } from '../../../types/profile';

interface ProfileThumbProps {
  profile: IProfile;
}

const ProfileThumb = ({ profile }: ProfileThumbProps) => {
  const defaultImage = 'https://picsum.photos/200';

  return (
    <div className="bg-gradient-to-r flex flex-col from-gray-700 h-64 items-center justify-center p-4 rounded-lg text-white to-gray-900 via-gray-800 w-64
    ">
      <img
        src={profile.profilePhoto || defaultImage}
        alt={profile.firstName || 'Default Profile'}
        className="h-24 mb-4 object-cover rounded-full w-24"
      />

      <h1 className="font-bold mb-2 text-xl">
        {profile.firstName} {profile.lastName}
      </h1>
      <h2 className="mb-2 text-md ">{profile.personalBio}</h2>
    </div>
  );
};

export default ProfileThumb;
