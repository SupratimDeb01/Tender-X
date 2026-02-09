import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import Button from "../../components/ui/Button";
import { MdHistory, MdArrowBack } from "react-icons/md";

const SubmittedBids = () => {
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBids = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.BID.GET_MY_BIDS);
        setBids(res.data);
      } catch (err) {
        console.error("Error fetching my bids", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBids();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
      case "selected":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Submitted Bids</h1>
            <p className="text-slate-500 mt-1">Track the status of your proposals</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard/supplier")}
            className="gap-2"
          >
            <MdArrowBack className="text-lg" />
            Back to Dashboard
          </Button>
        </div>

        {/* content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : bids.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
            <div className="mx-auto bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <MdHistory className="text-3xl text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No Bids Found</h3>
            <p className="text-slate-500 mt-1 max-w-sm mx-auto">
              You haven't submitted any bids yet. Browser open requests to start bidding.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 font-semibold text-slate-700 uppercase tracking-wider text-xs">RFQ Title</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 uppercase tracking-wider text-xs">Manufacturer</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 uppercase tracking-wider text-xs">Quantity</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 uppercase tracking-wider text-xs">Unit Price</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 uppercase tracking-wider text-xs">Delivery</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 uppercase tracking-wider text-xs">Total</th>
                    <th className="px-6 py-4 font-semibold text-slate-700 uppercase tracking-wider text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bids.map((bid) => (
                    <tr 
                      key={bid._id} 
                      className="hover:bg-slate-50/80 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 text-slate-900 font-medium">{bid.rfq?.title}</td>
                      <td className="px-6 py-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                            {bid.rfq?.manufacturer?.name?.charAt(0) || "M"}
                          </span>
                          {bid.rfq?.manufacturer?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{bid.rfq?.quantity?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600 font-mono">${bid.unitPrice?.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-600">{bid.deliveryDays} Days</td>
                      <td className="px-6 py-4 font-semibold text-slate-900 font-mono">${bid.total?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(bid.status)} capitalize`}>
                          {bid.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SubmittedBids;
