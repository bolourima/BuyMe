import { IconPic } from "@/svg/IconPic";
import { Trash } from "@/svg/Trash";
import { uploadSingleImage } from "@/utilities/uploadSingleImage";
import React from "react";

export const AddProductImageSection = ({
  imageOnePreview,
  imageTwoPreview,
  imageThreePreview,
  setImageOnePreview,
  setImageTwoPreview,
  setImageThreePreview,
}: {
  imageOnePreview: string;
  imageTwoPreview: string;
  imageThreePreview: string;
  setImageOnePreview: React.Dispatch<React.SetStateAction<string>>;
  setImageTwoPreview: React.Dispatch<React.SetStateAction<string>>;
  setImageThreePreview: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col bg-white w-[563px] rounded-lg p-6 gap-4">
      <div>
        <span>Бүтээгдэхүүний зураг</span>
      </div>
      <div className="flex gap-2">
        <label className="flex cursor-pointer relative w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
          <IconPic />
          {imageOnePreview ? (
            <div className="absolute w-full h-full z-30 flex justify-end">
              <img className="w-full h-full" src={imageOnePreview} />
              <button
                type="button"
                onClick={(e) => setImageOnePreview("")}
                className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
              >
                <Trash />
              </button>
            </div>
          ) : (
            <input
              type="file"
              hidden
              multiple={false}
              className="relative"
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  return;
                }
                uploadSingleImage(e.target.files[0], "One", setImageOnePreview);
              }}
            />
          )}
        </label>

        <label className="flex relative cursor-pointer w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
          <IconPic />
          {imageTwoPreview ? (
            <div className="absolute w-full h-full z-30 flex justify-end">
              <img className="w-full h-full" src={imageTwoPreview} />
              <button
                type="button"
                onClick={(e) => setImageTwoPreview("")}
                className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
              >
                <Trash />
              </button>
            </div>
          ) : (
            <input
              type="file"
              hidden
              multiple={false}
              className="relative"
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  return;
                }
                uploadSingleImage(e.target.files[0], "Two", setImageTwoPreview);
              }}
            />
          )}
        </label>
        <label className="flex relative cursor-pointer w-[125px] h-[125px] border-dashed border-2 justify-center items-center rounded-xl">
          <IconPic />
          {imageThreePreview ? (
            <div className="absolute w-full h-full z-30 flex justify-end">
              <img className="w-full h-full" src={imageThreePreview} />
              <button
                onClick={(e) => setImageThreePreview("")}
                className="w-6 h-6 absolute z-50 mt-2 mr-2 bg-white flex justify-center items-center rounded-xl p-1"
              >
                <Trash />
              </button>
            </div>
          ) : (
            <input
              type="file"
              hidden
              multiple={false}
              className="relative"
              onChange={(e) => {
                if (!e.target.files || e.target.files.length === 0) {
                  return;
                }
                uploadSingleImage(
                  e.target.files[0],
                  "Three",
                  setImageThreePreview
                );
              }}
            />
          )}
        </label>
      </div>
    </div>
  );
};
