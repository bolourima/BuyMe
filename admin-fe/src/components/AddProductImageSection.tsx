import { IconPic } from "@/svg/IconPic";
import { Trash } from "@/svg/Trash";
import { GetProductType } from "@/types/getProductType";
import React, { useState } from "react";

export const AddProductImageSection = ({
  images,
  setImages,
  imageOnePreview,
  imageTwoPreview,
  imageThreePreview,
  setImageOnePreview,
  setImageTwoPreview,
  setImageThreePreview,
}: {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  imageOnePreview: string;
  imageTwoPreview: string;
  imageThreePreview: string;
  setImageOnePreview: React.Dispatch<React.SetStateAction<string>>;
  setImageTwoPreview: React.Dispatch<React.SetStateAction<string>>;
  setImageThreePreview: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [firstFile, setFirstFile] = useState<File>();
  const [secondFile, setSecondFile] = useState<File>();

  const [thirdFile, setThirdFile] = useState<File>();
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
                onClick={(e) => {
                  setImageOnePreview(""),
                    setImages(
                      images.filter((el) => {
                        return el.name !== firstFile?.name;
                      })
                    );
                }}
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
                setFirstFile(e.target.files[0]);
                setImageOnePreview(URL.createObjectURL(e.target.files[0]));
                setImages([...images, e.target.files[0]]);
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
                onClick={(e) => {
                  setImageTwoPreview(""),
                    setImages(
                      images.filter((el) => {
                        return el.name !== secondFile?.name;
                      })
                    );
                }}
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
                setSecondFile(e.target.files[0]);
                setImageTwoPreview(URL.createObjectURL(e.target.files[0]));
                setImages([...images, e.target.files[0]]);
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
                onClick={(e) => {
                  setImageThreePreview(""),
                    setImages(
                      images.filter((el) => {
                        return el.name !== thirdFile?.name;
                      })
                    );
                }}
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
                setThirdFile(e.target.files[0]);
                setImageThreePreview(URL.createObjectURL(e.target.files[0]));
                setImages([...images, e.target.files[0]]);
              }}
            />
          )}
        </label>
      </div>
    </div>
  );
};
