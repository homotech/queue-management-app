"use client";
import React from "react";
import Button from "./Button";
interface DeleteModalProps {
  itemName: string;
  onClose: () => void;
  isOpen: boolean;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-bold mb-2">Delete?</h2>
        <p className="mb-2">
          Are you sure you want to delete <strong>{itemName}</strong>? This
          action can't be undone.
        </p>
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer w-full rounded bg-gray-300 hover:bg-gray-400 text-black px-4 py-2"
            // full={true}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer w-full rounded bg-gray-300 hover:bg-gray-400 text-white bg-red-600 hover:bg-red-700"
            // full={true}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
