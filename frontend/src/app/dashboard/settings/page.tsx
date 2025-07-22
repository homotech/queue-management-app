"use client";

import Button from "@/components/Button";
import DeleteModal from "@/components/deleteModal";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons/faTrashAlt";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "@/../lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Settings = () => {
  const [businessName, setBusinessName] = useState("");
  const [newName, setNewName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete("/auth/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(response.data.message || "Account Deleted Successfully");

      setShowModal(false);
      setTimeout(() => {
        localStorage.removeItem("token");
        router.push("/login");
      }, 300);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete account.");
    }
  };

  return (
    <div>
      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        itemName="This Account"
      />
      <h1 className="text-4xl font-bold">Settings</h1>
      <div className="flex w-full place-content-between border-2 border-black rounded p-4">
        <div>
          <h3 className="text-xl font-semibold tracking-tighter">
            Delete Account
          </h3>
          <p>This action can not be undone</p>
        </div>
        <div>
          <Button
            onClick={() => setShowModal(true)}
            additionalStyles="bg-red-600 hover:bg-red-700"
            full={false}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
