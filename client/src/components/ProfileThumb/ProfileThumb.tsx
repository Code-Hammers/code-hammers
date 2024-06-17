import { IProfile } from '../../../types/profile';

interface ProfileThumbProps {
  profile: IProfile;
}

const ProfileThumb = ({ profile }: ProfileThumbProps) => {
  const defaultImage = 'https://picsum.photos/200';

  const shortenBio = (bio: string | undefined, wordLimit: number) => {
    if (!bio) return;
    const words: string[] = bio.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return bio;
  };

  return (
    <div className="bg-gradient-to-r flex flex-col from-gray-700 h-64 items-center justify-center p-4 rounded-lg text-white to-gray-900 via-gray-800 w-64">
      <img
        src={profile.profilePhoto || defaultImage}
        alt={profile.firstName || 'Default Profile'}
        className="h-24 mb-4 object-cover rounded-full w-24"
      />

      <h1 className="font-bold mb-2 text-xl">
        {profile.firstName} {profile.lastName}
      </h1>
      <h1 className="font-bold mb-2 text-xs">
        {profile.careerInformation?.currentPosition?.title} @ {profile.careerInformation?.currentPosition?.company}
      </h1>
      <h2 className="max-h-10 mb-2 text-xs">{shortenBio(profile.personalBio, 8)}</h2>
    </div>
  );
};

export default ProfileThumb;
