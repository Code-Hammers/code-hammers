import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchUserProfile,
  // updateUserProfile,
} from "../../features/userProfile/userProfileSlice";

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
  const { profile, status } = useAppSelector((state) => state.userProfile);
  const userID = useAppSelector((state) => state.user.userData._id);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    personalBio: "",
  });

  useEffect(() => {
    dispatch(fetchUserProfile(userID));
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Again, assuming you have a way to include the user ID
    const userID = "currentUser_ID";
    dispatch(updateUserProfile({ ...formData, userID }));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="personalBio">Personal Bio:</label>
          <input
            type="text"
            id="personalBio"
            name="personalBio"
            value={formData.personalBio}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
