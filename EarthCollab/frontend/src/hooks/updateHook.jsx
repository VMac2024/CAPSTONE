import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../context/userContext";

export function useUpdateHook() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { currentUser } = useUserContext();

  const updateHook = async (endpoint, id, updatedData, onSuccess) => {
    const formData = new FormData();
    const headers = { "x-access-token": currentUser.token };
    formData.append("title", updatedData.title);
    formData.append("content", updatedData.content);
    formData.append("category", updatedData.category);
    if (updatedData.file) {
      formData.append("file", updatedData.file);
    }
    try {
      const response = await axios.put(`/${endpoint}/${id}`, formData, { headers: headers });
      setSuccess("item updated");
      if (onSuccess) onSuccess(response.data.data);
    } catch (err) {
      console.error("Error updating item", err);
      setError("Could not update item");
    }
  };
  return {
    updateHook,
    error,
    success,
    clearMessages: () => {
      setError(null);
      setSuccess(null);
    },
  };
}
