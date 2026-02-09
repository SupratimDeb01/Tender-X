// src/components/SubmitBid.jsx
import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const SubmitBid = ({ rfq, onSuccess, onClose }) => {
  const [bidData, setBidData] = useState({
    unitPrice: "",
    deliveryDays: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await axiosInstance.post(API_PATHS.BID.SUBMIT(rfq._id), {
        unitPrice: bidData.unitPrice,
        deliveryDays: bidData.deliveryDays,
      });
      // alert("Bid submitted successfully!"); // Replaced with toast in parent or here if needed, but keeping simple for now
      setBidData({ unitPrice: "", deliveryDays: "" });
      onSuccess?.(); 
    } catch (error) {
      console.error("Error submitting bid:", error);
      setError("Failed to submit bid. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-1">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">
          Submit Bid
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          For: <span className="font-medium text-slate-700">{rfq?.title}</span>
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleBidSubmit} className="space-y-4">
        <Input
          label="Unit Price ($)"
          type="number"
          value={bidData.unitPrice}
          onChange={(e) =>
            setBidData({ ...bidData, unitPrice: e.target.value })
          }
          placeholder="0.00"
          required
          min="0"
          step="0.01"
        />

        <Input
          label="Delivery Days"
          type="number"
          value={bidData.deliveryDays}
          onChange={(e) =>
            setBidData({ ...bidData, deliveryDays: e.target.value })
          }
          placeholder="e.g. 7"
          required
          min="1"
        />

        <div className="pt-2 flex justify-end gap-3">
          {onClose && (
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            isLoading={loading}
            className="w-full sm:w-auto"
          >
            Submit Bid
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitBid;
