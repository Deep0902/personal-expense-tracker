import "./UserProfile.css";
import avatar1 from "/images/avatars/avatar-male-1.svg";
import avatar2 from "/images/avatars/avatar-male-2.svg";
import avatar3 from "/images/avatars/avatar-male-3.svg";
import avatar4 from "/images/avatars/avatar-girl-1.svg";
import avatar5 from "/images/avatars/avatar-girl-2.svg";
import avatar6 from "/images/avatars/avatar-girl-3.svg";
import editProfileImg from "/images/avatars/edit-profile-img.svg";
import { useState } from "react";
interface UserProfileProps {
  userData: any;
}
function UserProfile({ userData }: UserProfileProps) {
  const profileImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const imageSrc =
    userData.profile_img >= 1 && userData.profile_img <= 6
      ? profileImages[userData.profile_img - 1]
      : avatar1; // Fallback to profile1 if the number is out of bounds

  const [updatePasswordFields, setpasswordChange] = useState(false);
  function toggleUpdatePasswordFields() {
    setpasswordChange(!updatePasswordFields);
  }

  return (
    <>
      <div className="userProfileContainer">
        <div className="accountInfo">
          <div className="largeProfileIcon">
            <img className="profileImg" src={imageSrc} alt="" />
            <img src={editProfileImg} alt="" />
          </div>
          <div className="userDetails">
            <span className="poppins-bold">{userData.user_name}</span>
            <label className="poppins-regular">{userData.user_email}</label>
          </div>
          <button className="poppins-medium primary-button">Edit</button>
        </div>
        <br />
        <div className="accountDetails">
          <input type="text" value={userData.user_name} />
          <input type="text" value={userData.user_email} />

          <div
            className={`passwordChange ${
              updatePasswordFields ? "visible" : "hidden"
            }`}
          >
            <input type="text" placeholder="Enter old Password" />
            <input type="text" placeholder="Enter New Password" />
            <input type="text" placeholder="Confirm New Password" />
          </div>
        </div>
        <div className="actionButtons">
          {!updatePasswordFields && (
            <button
              className="primary-button poppins-regular"
              onClick={toggleUpdatePasswordFields}
            >
              Change Details
            </button>
          )}
          {updatePasswordFields && (
            <button
              className="primary-button poppins-regular"
              onClick={toggleUpdatePasswordFields}
            >
              Update Password
            </button>
          )}
          <button className="warning-button poppins-regular">
            Delete my Account
          </button>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
