import React, { useContext, useEffect, useState } from "react";
import { MyProfilePicEdit } from "@/components/MyProfilePicEdit";
import { EditIconWhite } from "@/icon/EditIconWhite";
import { ProfileSideBar } from "@/components/ProfileSideBar";
import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/router";
import { toastifySuccess, toastifyWarning } from "@/utilities/toastify";
import { jwtDecode } from "jwt-decode";
import { refresh } from "@/utilities/refreshToken";
import { getUserInfo } from "@/utilities/getUserInfo";
import { UserType } from "@/types/userType";
import { userInitial } from "@/types/userInitial";
import { ProfileInfoEdit } from "@/components/ProfileInfoEdit";
import { ProfileInfo } from "@/components/ProfileInfo";

export default function MyProfile() {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const [user, setUser] = useState<UserType>(userInitial);
  const [editUser, setEditUser] = useState(false);
  const [newAvatarImage, setNewAvatarImg] = useState(
    user.avatarImg ? user.avatarImg : ""
  );
  const getUser = (data: UserType) => {
    setUser(data);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/signin");
      return toastifyWarning("Please sign in");
    }
    const exp = jwtDecode(accessToken).exp;
    if (!exp) return;
    if (exp < Date.now() / 1000) {
      refresh();
    }
    getUserInfo(accessToken, getUser);
    setToken(accessToken);
  }, []);
  return (
    <>
      <div className="lg:flex flex-col bg-white text-black p-5 gap-4 w-full h-fit">
        <div className=" flex flex-col lg:flex lg:flex-row ">
          <div className=" hidden  lg:flex lg:w-1/4">
            <ProfileSideBar user={user} />
          </div>
          <div className="flex flex-col gap-6 lg:w-3/4 lg:px-5">
            <div className="flex gap-3 justify-between items-center w-full">
              <div className="">
                <MyProfilePicEdit
                  avatar={user.avatarImg}
                  img={newAvatarImage}
                  setImg={setNewAvatarImg}
                  token={token}
                  editUser={editUser}
                />
              </div>
              <div className="flex flex-col gap-5">
                <button
                  onClick={() => setEditUser(!editUser)}
                  className=" w-[200px] lg:bbtn flex bg-black text-white lg:w-[250px] h-[30px] justify-center items-center rounded-md hover:bg-gray-400 hover:font-bold hover:text-black "
                >
                  <div className="w-5 h-5 mx-4">
                    <EditIconWhite />
                  </div>
                  <p>{editUser ? "Cancel edit" : "Edit"}</p>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    setToken("");
                    router.push("/signin");
                    toastifySuccess("Successfully signed out");
                  }}
                  className=" w-[200px] lg: flex bg-black text-white lg:w-[250px] h-[30px] justify-center items-center rounded-md hover:bg-gray-400 hover:font-bold hover:text-black"
                >
                  <p>Sign out</p>
                </button>
              </div>
            </div>
            {editUser ? (
              <ProfileInfoEdit
                token={token}
                img={newAvatarImage}
                avatar={user.avatarImg}
                user={user}
                setOnEdit={setEditUser}
              />
            ) : (
              <ProfileInfo user={user} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
