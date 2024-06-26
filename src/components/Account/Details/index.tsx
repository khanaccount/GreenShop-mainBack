import React from "react";
import axios from "axios";
import s from "./index.module.scss";

import { getAuthHeaders } from "../../../api/auth";

const Details: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [passwordChanged, setPasswordChanged] = React.useState(false);

  const currentPasswordRef = React.useRef<HTMLInputElement>(null);
  const newPasswordRef = React.useRef<HTMLInputElement>(null);
  const confirmNewPasswordRef = React.useRef<HTMLInputElement>(null);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const profileImg = new FormData();
        profileImg.append("profileImg", file);

        const token = getAuthHeaders();
        const config = {
          headers: {
            Authorization: token?.headers?.Authorization,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await axios.post(
          "https://greenshop-backend-production.up.railway.app/shop/customer/avatar/",
          profileImg,
          config
        );

        if (response.status === 200) {
          const profileImgLink = response.data.profileImg;
          setImageSrc(profileImgLink);
          alert("Image uploaded successfully");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Error uploading image. Please try again later.");
      }
    } else {
      alert("Please select an image file.");
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      const token = getAuthHeaders();
      await axios.delete(
        "https://greenshop-backend-production.up.railway.app/shop/customer/avatar/",
        {
          headers: {
            Authorization: token?.headers?.Authorization,
          },
        }
      );
      setImageSrc(null);
      alert("Avatar deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting avatar: ", error);
      alert("Error deleting avatar. Please try again later.");
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = getAuthHeaders();
      const response = await axios.post(
        "https://greenshop-backend-production.up.railway.app/shop/customer/changePassword/",
        {
          currentPassword: currentPasswordRef.current?.value,
          password: newPasswordRef.current?.value,
          confirmPassword: confirmNewPasswordRef.current?.value,
        },
        {
          headers: {
            Authorization: token?.headers?.Authorization,
          },
        }
      );

      if (response.status === 200) {
        setPasswordChanged(true);
        alert("Password changed successfully");

        if (currentPasswordRef.current && newPasswordRef.current && confirmNewPasswordRef.current) {
          currentPasswordRef.current.value = "";
          newPasswordRef.current.value = "";
          confirmNewPasswordRef.current.value = "";
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        const errorMessage = error.response.data.error;
        alert(`Error: ${errorMessage}`);

        if (currentPasswordRef.current && newPasswordRef.current && confirmNewPasswordRef.current) {
          currentPasswordRef.current.value = "";
          newPasswordRef.current.value = "";
          confirmNewPasswordRef.current.value = "";
        }
      } else {
        alert("Error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className={s.details}>
      <h5>Личная информация</h5>
      <div className={s.emailImg}>
        <div className={s.emailNumberBlock}>
          <form className={s.email}>
            <label htmlFor="email">
              <p>Электронная почта</p>
              <input type="text" id="email" name="email" />
            </label>
          </form>
          <button className={s.changeEmail}>Поменять почту</button>
        </div>

        <div className={s.userImgBlock}>
          <div className={s.imgBlock}>
            <p>Фото</p>
            <div className={s.imgBtnBlock}>
              <div className={s.img}>
                {imageSrc ? (
                  <div className={s.img}>
                    <img src="img/account/cyrcle.svg" alt="cyrcle" />
                    <img src="img/account/border.svg" alt="border" />
                    <img className={s.userImg} src={imageSrc} alt="User" />
                  </div>
                ) : (
                  <div className={s.img}>
                    <img src="img/account/cyrcle.svg" alt="cyrcle" />
                    <img src="img/account/border.svg" alt="border" />
                    <img className={s.choiceImg} src="img/account/img.svg" alt="img" />
                  </div>
                )}
              </div>
              <div className={s.choiceBtn}>
                <label htmlFor="upload-photo" className={s.changeBtn}>
                  Поменять
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="upload-photo"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <button className={s.removeBtn} onClick={handleDeleteAvatar}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={s.passwordBlock}>
        <h5 className={s.password}>Изменить пароль</h5>
        <form className={s.form}>
          <p>Предыдущий пароль</p>
          <div className={s.passwordContainer}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="currentPassword"
              ref={currentPasswordRef}
            />
            <img
              src={passwordVisible ? "img/header/eyeClose.svg" : "img/header/eye.svg"}
              width={24}
              alt="eye"
              onClick={handleTogglePasswordVisibility}
            />
          </div>
        </form>
        <form className={s.form}>
          <p>Новый пароль</p>
          <div className={s.passwordContainer}>
            <input
              ref={newPasswordRef}
              type={passwordVisible ? "text" : "password"}
              name="newPassword"
            />
            <img
              src={passwordVisible ? "img/header/eyeClose.svg" : "img/header/eye.svg"}
              width={24}
              alt="eye"
              onClick={handleTogglePasswordVisibility}
            />
          </div>
        </form>
        <form className={s.form}>
          <p>Подтвердить новый пароль</p>
          <div className={s.passwordContainer}>
            <input
              ref={confirmNewPasswordRef}
              type={passwordVisible ? "text" : "password"}
              name="confirmNewPassword"
            />
            <img
              src={passwordVisible ? "img/header/eyeClose.svg" : "img/header/eye.svg"}
              width={24}
              alt="eye"
              onClick={handleTogglePasswordVisibility}
            />
          </div>
        </form>
      </div>
      {passwordChanged ? (
        <button className={s.passwordChanged}>Пароль изменён</button>
      ) : (
        <button className={s.changePassword} onClick={handleChangePassword}>
          Поменять пароль
        </button>
      )}
    </div>
  );
};

export default Details;
