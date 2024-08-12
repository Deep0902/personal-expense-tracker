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
import { useNavigate } from "react-router-dom";

interface UserProfileProps {
  userData: any;
  toggleParentUseEffect: () => void;
}

function UserProfile({ userData, toggleParentUseEffect }: UserProfileProps) {
  const navigate = useNavigate();
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
  const [chooseProfileOverlay, setChooseProfileOverlay] = useState(false);
  const [selectedImage, setSelectedImage] = useState(imageSrc);
  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const toggleUpdatePasswordFields = () => {
    setpasswordChange(!updatePasswordFields);
    if (!updatePasswordFields) {
      // Clear password fields when enabling password change
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setName(userData.user_name)
    setEmail(userData.user_email)
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
        userData.user_name = updatedData.user_name;
        userData.user_email = updatedData.user_email;
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

  const deleteUser = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );

    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:5000/api/users/${userData.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("User deleted successfully");
        navigate("/SignIn");
        console.log(response.data.message);
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("An error occurred while trying to delete the user.");
      }
    } else {
      alert("User deletion cancelled.");
    }
  };

  const toggleChooseProfileOverlay = () => {
    setChooseProfileOverlay(!chooseProfileOverlay);
    setSelectedImage(imageSrc); // Set the initially selected image
  };

  const handleImageClick = (image: any, index: number) => {
    setImageIndex(index);
    setSelectedImage(image);
  };

  const handleProfileImageUpdate = async () => {
    if (imageIndex !== null) {
      const updatedData = {
        profile_img: imageIndex + 1, // Adjusting for 0-based index
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
          console.log("Profile image updated successfully!");
          toggleParentUseEffect();
          // Update the user's profile image locally
          userData.profile_img = updatedData.profile_img;
          toggleChooseProfileOverlay();
        } else {
          alert("Failed to update profile image.");
        }
      } catch (err) {
        console.error("Error updating profile image:", err);
        alert("An error occurred while updating the profile image.");
      }
    } else {
      alert("Please select an image before confirming.");
    }
  };

  // State for managing password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const handleOldPasswordView = () => {
    setShowOldPassword(!showOldPassword);
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleNewPasswordView = () => {
    setShowNewPassword(!showNewPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleConfirmPasswordView = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <div className="userProfileContainer">
        <div className="accountInfo">
          <div className="largeProfileIcon">
            <img className="profileImg" src={imageSrc} alt="" />
            <img
              src={editProfileImg}
              alt=""
              onClick={toggleChooseProfileOverlay}
            />
          </div>
          <div className="userDetails">
            <span className="poppins-bold">{userData.user_name}</span>
            <label className="poppins-regular">{userData.user_email}</label>
          </div>
        </div>
        {chooseProfileOverlay && (
          <div className="overlayBackground">
            <div className="poppins-bold">
              <div className="overlayBox">
                <label className="">Choose a Profile photo</label>
                <div className="iconsDisplay">
                  {profileImages.map((icons, index) => {
                    return (
                      <div className="iconGrid">
                        <img
                          key={index}
                          src={icons}
                          alt=""
                          className={
                            icons === selectedImage ? "profile-selected" : ""
                          }
                          onClick={() => handleImageClick(icons, index)}
                        />
                      </div>
                    );
                  })}
                </div>
                <br />

                <button
                  className="poppins-semibold add-button"
                  onClick={handleProfileImageUpdate}
                >
                  Select
                </button>
                <button
                  className="poppins-semibold cancel-button"
                  onClick={toggleChooseProfileOverlay}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
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
              <div className="inputBox2">
                <input
                  className="form-group"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                  placeholder="Enter old password"
                />
                <span onClick={handleOldPasswordView}>👁️</span>
              </div>
              <div className="inputBox2">
                <input
                  className="form-group"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  placeholder="Enter new password"
                />
                <span onClick={handleNewPasswordView}>👁️</span>
              </div>
              <div className="inputBox2">
                <input
                  className="form-group"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm new password"
                />
                <span onClick={handleConfirmPasswordView}>👁️</span>
              </div>
            </div>
          </div>
          <div className="actionButtons">
            <div className="passwordsButton">
              {updatePasswordFields && (
                <button
                  className="secondary-button poppins-regular"
                  type="submit"
                >
                  {updatePasswordFields ? "Update Profile" : "Edit Details"}
                </button>
              )}
              <button
                className="primary-button poppins-regular"
                type="button"
                onClick={toggleUpdatePasswordFields}
              >
                {updatePasswordFields ? "Cancel" : "Edit Details"}
              </button>
            </div>

            <button
              className="warning-button poppins-regular"
              type="button"
              onClick={deleteUser}
            >
              Delete my Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
