import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/userContext";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Modals from "../../components/Modals";
import { MdArrowBack, MdDelete, MdFilterList, MdCheckCircle, MdCancel, MdLocalShipping, MdAttachMoney, MdWarning } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const RfqById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, loading: userLoading } = useContext(UserContext);

  const [rfq, setRfq] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bidsLoading, setBidsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recommendedBidId, setRecommendedBidId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/");
      return;
    }
    if (!user) return;

    const fetchRfq = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.RFQ.GET_BY_ID(id));
        setRfq(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchBids = async () => {
      try {
        setBidsLoading(true);
        const response = await axiosInstance.get(API_PATHS.BID.GET_BY_RFQ(id));
        setBids(response.data);
      } catch (err) {
        console.error("Error fetching bids:", err);
      } finally {
        setBidsLoading(false);
      }
    };

    fetchRfq();
    fetchBids();
  }, [id, user, userLoading, navigate]);

  const performDelete = async () => {
    try {
      await axiosInstance.delete(API_PATHS.RFQ.DELETE_BY_ID(id));
      setShowDeleteConfirm(false);
      toast.success("RFQ deleted successfully");
      navigate("/dashboard/manufacturer");
    } catch (err) {
      toast.error("Failed to delete RFQ");
    }
  };

  const handleDelete = async () => {
    const hasAcceptedBid = bids.some(bid => bid.status === 'ACCEPTED' || bid.status === 'SELECTED');
    if (hasAcceptedBid) {
      toast.error("Cannot delete RFQ because a supplier has already been selected.");
      return;
    }
    setShowDeleteConfirm(true);
  };

  const handleAcceptBid = async (bidId) => {
    try {
      await axiosInstance.put(API_PATHS.BID.SELECT(bidId));
      toast.success("Bid accepted & PO created");
      const res = await axiosInstance.get(API_PATHS.BID.GET_BY_RFQ(id));
      setBids(res.data);
    } catch (err) {
      console.error("Error accepting bid:", err);
      toast.error("Failed to accept bid");
    }
  };

  const handleRejectBid = async (bidId) => {
    try {
      await axiosInstance.put(API_PATHS.BID.REJECT(bidId));
      toast.success("Bid rejected");
      const res = await axiosInstance.get(API_PATHS.BID.GET_BY_RFQ(id));
      setBids(res.data);
    } catch (err) {
      console.error("Error rejecting bid:", err);
      toast.error("Failed to reject bid");
    }
  };

 const handleFilter = async () => {
  try {
    const res = await axiosInstance.put(API_PATHS.BID.RECOMMEND_BY_RFQ(id));
    setRecommendedBidId(res.data.bid._id); // backend returns bid
    toast.success("Best bid recommended!");
  } catch (err) {
    console.error("Error fetching recommended bid:", err);
    toast.error("Failed to get recommendation");
  }
};


  if (userLoading) return <div className="flex justify-center items-center h-screen">Loading user...</div>;
  if (!user) return null;

  return (
    <DashboardLayout>
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : error || !rfq ? (
        <div className="text-center py-12">
          <p className="text-slate-500">No RFQ found.</p>
          <Button variant="outline" onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Button
              variant="ghost"
              onClick={() =>
                user?.role === "manufacturer"
                  ? navigate("/dashboard/manufacturer")
                  : navigate("/dashboard/supplier")
              }
              className="gap-2 pl-0 hover:bg-transparent hover:text-indigo-600"
            >
              <MdArrowBack className="text-lg" />
              Back to Dashboard
            </Button>

            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              className="gap-2"
              disabled={bids.some(bid => bid.status === 'ACCEPTED' || bid.status === 'SELECTED')}
              title={bids.some(bid => bid.status === 'ACCEPTED' || bid.status === 'SELECTED') ? "Cannot delete RFQ with accepted bids" : "Delete RFQ"}
            >
              <MdDelete className="text-lg" />
              Delete RFQ
            </Button>
          </div>

          {/* RFQ Details Card */}
          <Card className="p-6 border-l-4 border-l-indigo-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">{rfq.title}</h1>
                {(() => {
                  const isExpired = new Date(rfq.deadline) < new Date() && rfq.status === "open";
                  const displayStatus = isExpired ? "Expired" : rfq.status;
                  const statusColor = 
                    displayStatus === "open" ? "bg-green-100 text-green-700" :
                    displayStatus === "Expired" ? "bg-red-100 text-red-700" :
                    "bg-slate-100 text-slate-600";
                  
                  return (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${statusColor}`}>
                      {displayStatus}
                    </span>
                  );
                })()}
              </div>
              <div className="text-right text-sm text-slate-500">
                <p>Deadline</p>
                <p className="font-medium text-slate-900">{new Date(rfq.deadline).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="prose prose-slate max-w-none mb-6">
              <p className="text-slate-600">{rfq.description}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg w-fit">
              <span className="font-medium text-slate-700">Quantity Required:</span>
              {rfq.quantity} units
            </div>
          </Card>

          {/* Bids Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900">Supplier Bids</h2>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleFilter}
                className="gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/30"
              >
                <MdFilterList className="text-lg" />
                Recommend Best Bid
              </Button>
            </div>

            {bidsLoading ? (
              <div className="text-center py-8 text-slate-500">Loading bids...</div>
            ) : bids.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-500">No bids submitted yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bids.map((bid) => (
                  <Card
                    key={bid._id}
                    className={`p-5 transition-all duration-300 ${
                      recommendedBidId === bid._id
                        ? "ring-2 ring-purple-500 shadow-purple-100 bg-purple-50/30"
                        : "hover:shadow-md"
                    }`}
                  >
                    {recommendedBidId === bid._id && (
                      <div className="mb-3">
                        <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                          Recommended
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">{bid.supplier?.name || "Unknown Supplier"}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">Bid ID: {bid._id.slice(-6)}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        bid.status === 'ACCEPTED' || bid.status === 'SELECTED' ? 'bg-green-100 text-green-700' :
                        bid.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {bid.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-slate-600">
                        <MdAttachMoney className="text-slate-400 text-lg" />
                        <div>
                          <p className="text-xs text-slate-400">Unit Price</p>
                          <p className="font-semibold text-slate-900">${bid.unitPrice}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MdLocalShipping className="text-slate-400 text-lg" />
                        <div>
                          <p className="text-xs text-slate-400">Delivery</p>
                          <p className="font-semibold text-slate-900">{bid.deliveryDays} days</p>
                        </div>
                      </div>
                    </div>

                    {bid.status === "PENDING" && (
                      <div className="flex gap-2 pt-4 border-t border-slate-100">
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700 shadow-green-500/30"
                          onClick={() => handleAcceptBid(bid._id)}
                        >
                          <MdCheckCircle className="mr-1" /> Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleRejectBid(bid._id)}
                        >
                          <MdCancel className="mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Delete Confirmation Modal */}
          <Modals
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            title="Confirm Deletion"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <MdWarning className="h-6 w-6 text-red-600" />
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to delete this RFQ? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={performDelete}
                >
                  Delete RFQ
                </Button>
              </div>
            </div>
          </Modals>
        </div>
      )}
    </DashboardLayout>
  );
};

export default RfqById;
