import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../store/userProfileSlice';
import { useParams } from 'react-router-dom';

const getInitials = (name = '') => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const UserProfiles = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId));
    }
  }, [userId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile found.</div>;

  // Static values for followers/following
  const followers = 123;
  const following = 45;
  const posts = profile.postsCount || 0; // If you have postsCount, otherwise 0

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
      {/* Left Side: Profile Pic/Initials and Stats */}
      <div className="flex flex-col items-center w-full md:w-1/3">
        {/* Profile Picture or Initials */}
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-700 mb-4">
          {profile.profilePicUrl ? (
            <img src={profile.profilePicUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
          ) : (
            getInitials(profile.name || profile.username || 'U')
          )}
        </div>
        {/* Stats */}
        <div className="flex flex-col gap-2 w-full">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{posts}</div>
            <div className="text-gray-500 text-sm">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{followers}</div>
            <div className="text-gray-500 text-sm">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{following}</div>
            <div className="text-gray-500 text-sm">Following</div>
          </div>
        </div>
      </div>
      {/* Right Side: User Info */}
      <div className="flex-1 flex flex-col items-center md:items-start w-full">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-lg font-semibold text-gray-700">@{profile.username || 'username'}</span>
          <button className="px-4 py-1 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-sm">Follow</button>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{profile.name}</h2>
        <p className="text-gray-500 mb-2">{profile.email}</p>
        <p className="text-gray-600 mb-4">{profile.bio || 'No bio provided.'}</p>
      </div>
    </div>
  );
};

export default UserProfiles;