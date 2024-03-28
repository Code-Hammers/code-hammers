import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchUserProfile,
  updateUserProfile,
} from "../../features/userProfile/userProfileSlice";

const EditProfilePage = () => {
  const dispatch = useAppDispatch();
};

export default EditProfilePage;
