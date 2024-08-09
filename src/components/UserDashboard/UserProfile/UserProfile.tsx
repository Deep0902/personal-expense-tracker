import "./UserProfile.css";
import avatar1 from "/images/avatars/avatar-male-1.svg";
import avatar2 from "/images/avatars/avatar-male-2.svg";
import avatar3 from "/images/avatars/avatar-male-3.svg";
import avatar4 from "/images/avatars/avatar-girl-1.svg";
import avatar5 from "/images/avatars/avatar-girl-2.svg";
import avatar6 from "/images/avatars/avatar-girl-3.svg";
import editProfileImg from "/images/avatars/edit-profile-img.svg";
import { useState } from "react";
import axios from "axios";

interface UserProfileProps {
  userData: any;
}

function UserProfile({ userData }: UserProfileProps) {
  const profileImages = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const imageSrc =
    userData.profile_img >= 1 && userData.profile_img <= 6
      ? profileImages[userData.profile_img - 1]
      : avatar1; // Fallback to profile1 if the number is out of bounds

  const [name, setName] = useState(userData.user_name);
  const [email, setEmail] = useState(userData.user_email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const token = "my_secure_token"; // Add token for authorization

  const [updatePasswordFields, setpasswordChange] = useState(false);

  const toggleUpdatePasswordFields = () => {
    setpasswordChange(!updatePasswordFields);
    if (!updatePasswordFields) {
      // Clear password fields when enabling password change
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password fields if the user is changing the password
    if (updatePasswordFields) {
      if (oldPassword !== userData.user_pass) {
        alert("Old password is incorrect.");
        return;
      }
      if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
    }

    // Prepare data for API
    const updatedData = {
      user_name: name,
      user_email: email,
      user_pass: updatePasswordFields ? newPassword : userData.user_pass,
    };

    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/users/${userData.user_id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Profile updated successfully!");
        if (updatePasswordFields) {
          sessionStorage.setItem("user_pass", newPassword);
          localStorage.setItem("user_pass", newPassword);
        }
        userData.user_pass = newPassword;
        userData.user_name = updatedData.user_name
        userData.user_email = updatedData.user_email
        toggleUpdatePasswordFields();
        // You may want to update the userData state here if it's passed from parent component
      } else {
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating the profile.");
    }
  };

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
        </div>
        <br />

        <form onSubmit={handleSubmit}>
          <div className="accountDetails">
            <input
              className="form-group"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              disabled={!updatePasswordFields} // Disable when not changing password
            />
            <input
              className="form-group"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
              disabled={!updatePasswordFields} // Disable when not changing password
            />

            <div
              className={`passwordChange ${
                updatePasswordFields ? "visible" : "hidden"
              }`}
            >
              <input
                className="form-group"
                type="password"
                value={oldPassword}
                onChange={handleOldPasswordChange}
                placeholder="Enter old password"
              />
              <input
                className="form-group"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Enter new password"
              />
              <input
                className="form-group"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <div className="actionButtons">
            {updatePasswordFields && (
              <button className="primary-button poppins-regular" type="submit">
                {updatePasswordFields ? "Update Password" : "Change Details"}
              </button>
            )}
            <button
              className="primary-button poppins-regular"
              type="button"
              onClick={toggleUpdatePasswordFields}
            >
              {updatePasswordFields
                ? "Cancel Password Change"
                : "Change Password"}
            </button>
            <button className="warning-button poppins-regular" type="button">
              Delete my Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
