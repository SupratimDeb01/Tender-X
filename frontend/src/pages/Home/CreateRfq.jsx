import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const CreateRFQ = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!title || !description || !quantity || !deadline) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post(API_PATHS.RFQ.CREATE, {
        title,
        description,
        quantity,
        deadline,
      });
      setLoading(false);
      if (onSuccess) onSuccess(response.data);
      setTitle("");
      setDescription("");
      setQuantity("");
      setDeadline("");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Failed to create RFQ");
    }
  };

  return (
    <div className="p-1">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Create New RFQ</h2>
        <p className="text-slate-500 text-sm mt-1">Fill in the details to request a quotation.</p>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Office Chairs Procurement"
        />

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 min-h-[100px]"
            placeholder="Describe your requirements..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
            min="1"
          />

          <Input
            label="Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="w-full"
          >
            Create RFQ
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRFQ;
