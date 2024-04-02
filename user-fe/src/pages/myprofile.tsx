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

export default function MyProfile() {
  const router = useRouter();
  const [hoveredItem, setHoverItems] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const [user, setUser] = useState<UserType>(userInitial);
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
      <div className="flex flex-col bg-white text-black p-5 gap-14 w-full ">
        <div>
          <p className="text-2xl">My Profile</p>
        </div>
        <div className=" flex flex-col lg:flex lg:flex-row ">
          <div className=" hidden lg:flex">
            <ProfileSideBar user={user} />
          </div>
          <div className="flex flex-col gap-6 w-3/4">
            <div className="flex justify-between w-full px-5">
              <div>
                <MyProfilePicEdit />
              </div>
              <div className="w-fit h-fit flex flex-col gap-8">
                <button className="bttn flex bg-black text-white w-[200px] h-[50px] justify-center items-center rounded-lg ">
                  <div className="w-5 h-5 mx-4">
                    <EditIconWhite />
                  </div>

                  <p>Edit Profile</p>
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    setToken("");
                    router.push("/signin");
                    toastifySuccess("Successfully signed out");
                  }}
                  className="bttn flex bg-black text-white w-[200px] h-[50px] justify-center items-center rounded-lg "
                >
                  <p>Sign out</p>
                </button>
              </div>
            </div>
            <div className="w-full lg:flex gap-6 px-5">
              <div className="w-full lg:w-full">
                <form className="flex flex-col gap-2">
                  <label className="text-xs">First Name</label>
                  <input
                    className="input bg-white border-black border-1[px]"
                    type="email"
                    placeholder="First Name"
                  />
                </form>
              </div>
              <div className="w-full lg:w-full">
                <form className="flex flex-col gap-2 ">
                  <label className="text-xs">Last Name</label>
                  <input
                    className="input bg-white border-black border-1[px]"
                    type="email"
                    placeholder="Last Name"
                  />
                </form>
              </div>
            </div>
            <div className="w-full lg:flex gap-6 px-5">
              <div className="w-full lg:w-full">
                <form className="flex flex-col gap-2">
                  <label className="text-xs">Phone Number</label>
                  <input
                    className="input bg-white  border-black border-1[px]"
                    type="email"
                    placeholder="Phone Number"
                  />
                </form>
              </div>
              <div className="w-full lg:w-full">
                <form className="flex flex-col gap-2">
                  <label className="text-xs">Email Address</label>
                  <input
                    className="input bg-white border-black border-1[px]"
                    type="email"
                    placeholder="Email Address"
                  />
                </form>
              </div>
            </div>
            <div className="lg:flex gap-6 px-5">
              <div className="w-full">
                <form className="flex flex-col gap-2">
                  <label className="text-xs">Home Adress</label>
                  <input
                    className="input bg-white w-full border-black border-1[px]"
                    type="email"
                    placeholder="Home Address"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
