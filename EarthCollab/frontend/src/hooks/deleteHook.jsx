import axios from "axios";
import { useState } from "react";

export function useDeleteHook() {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const deleteHook = async (endpoint, id, onSuccess) => {
    try {
      await axios.delete(`/${endpoint}/${id}`);
      setSuccess("item deleted");
      if (onSuccess) onSuccess(id);
    } catch (err) {
      console.error("Error deleting item", err);
      setError("Could not delete item");
    }
  };
  return {
    deleteHook,
    error,
    success,
    clearMessages: () => {
      setError(null);
      setSuccess(null);
    },
  };
}
