import axios from "axios";
import { useState } from "react";

export function useUpdateHook() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateHook = async (endpoint, id, updatedData, onSuccess) => {
    try {
      const response = await axios.put(`/${endpoint}/${id}`, updatedData);
      setSuccess("item updated");
      if (onSuccess) onSuccess(response.data);

      const updatedItem = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;

      if (onSuccess) onSuccess(updatedItem);
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
