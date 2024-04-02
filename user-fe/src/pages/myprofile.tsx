import React, { useContext, useEffect, useState } from "react";
import { MyProfilePicEdit } from "@/components/MyProfilePicEdit";
import { EditIconWhite } from "@/icon/EditIconWhite";
import { ProfileSideBar } from "@/components/ProfileSideBar";
import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/router";
import { toastifySuccess, toastifyWarning } from "@/utilities/toastify";
import { jwtDecode } from "jwt-decode";
import { refresh } from "@/utilities/refreshToken";

export default function MyProfile() {
  const router = useRouter();
  const [hoveredItem, setHoverItems] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const accessToken = localStorage.getItem("accessToken");
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
            <ProfileSideBar />
          </div>

          {/* <div className="w-[300px] lg:flex">
            <div className=" border-gray-200 lg:border-gray-200 border-[1px]">
              <div className="flex gap-5 items-center p-5">
                <div className="flex w-12 h-12">
                  <img
                    className="rounded-full"
                    src="./IconPicture.jpeg"
                    alt=""
                  />
                </div>
                <div className="">
                  <div className="flex gap-3">
                    <div>
                      <p>Hello</p>
                    </div>
                    <div className="w-5 h-5">
                      <HandIcon />
                    </div>
                  </div>
                  <div className="text-xl">
                    <p>Elizabeth Warren</p>
                  </div>
                </div>
              </div>
              <div className="">
                <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
                  <div className="w-5 h-5 mx-4">
                    <UserIcon />
                  </div>

                  <p>Personal Information</p>
                </button>
                <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
                  <div className="w-5 h-5 mx-4">
                    <CartIcon />
                  </div>
                  <p>My Orders</p>
                </button>
                <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
                  <div className="w-5 h-5 mx-4">
                    <LocationIcon />
                  </div>
                  <p>Manage Addresses</p>
                </button>
                <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
                  <div className="w-5 h-5 mx-4">
                    <NotificationIcon />
                  </div>
                  <p>Notifications</p>
                </button>
              </div>
            </div>
          </div> */}
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
