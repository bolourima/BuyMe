import { instance } from "@/instance";
import { toastifySuccess } from "@/utilities/toastify";
import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 8,
  boxShadow: 40,
  p: 2,
};

type HandleStatusClose = () => void;

export default function ChangeStatus({
  id,
  openModal,
  handleStatusClose,
}: {
  id: string;
  openModal: boolean;
  handleStatusClose: HandleStatusClose;
}) {
  const wfmStatus = async (Status: string) => {
    try {
      const res = await instance.post("/orderStatus", { id, Status });
      toastifySuccess("Амжилтай төлөв өөрчлөгдлөө");
    } catch (error) {
      console.error(error);
      return alert("wfmStatusFailed");
    }
  };
  return (
    <Modal
      open={openModal}
      onClose={handleStatusClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div className="flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Төлөв өөрчлөх
          </Typography>
          <div
            onClick={handleStatusClose}
            className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-1 px-2 rounded-full"
          >
            Хаах
          </div>
        </div>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          className="flex gap-4 items-center justify-center"
        >
          <button
            onClick={() => {
              wfmStatus("PENDING");
              handleStatusClose();
            }}
            className={`text-white w-fit p-2 bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 border border-blue-700 rounded`}
          >
            PENDING
          </button>
          <button
            onClick={() => {
              wfmStatus("SHIPPED");
              handleStatusClose();
            }}
            className={`text-white w-fit p-2 bg-orange-500 hover:bg-orange-700 font-bold py-2 px-4 border border-blue-700 rounded`}
          >
            SHIPPED
          </button>
          <button
            onClick={() => {
              wfmStatus("DELIVERED");
              handleStatusClose();
            }}
            className={`text-white w-fit p-2 bg-green-500 hover:bg-green-700  font-bold py-2 px-4 border border-blue-700 rounded`}
          >
            DELIVERED
          </button>
        </Typography>
      </Box>
    </Modal>
  );
}
