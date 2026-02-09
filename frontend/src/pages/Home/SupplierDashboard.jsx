import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modals from "../../components/Modals";
import SubmitBid from "./SubmitBid";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { MdAssignment, MdHistory, MdGavel, MdClose } from "react-icons/md";

const SupplierDashboard = () => {
  const navigate = useNavigate();
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showBidModal, setShowBidModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRfq, setSelectedRfq] = useState(null);

  // Fetch open RFQs
  const fetchRFQs = async () => {
    try {
      const { data } = await axiosInstance.get(API_PATHS.RFQ.GET_ALL);
      const rfqList = Array.isArray(data) ? data : data.rfqs || [];
      const now = new Date();
      // Filter open RFQs that haven't expired
      setRfqs(rfqList.filter((rfq) => {
        const deadline = new Date(rfq.deadline);
        // Set deadline to end of day for fair comparison if needed, or keep as is
        return rfq.status === "open" && deadline > now;
      }));
    } catch (error) {
      console.error("Error fetching RFQs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRFQs();
  }, []);

  const openDetails = (rfq) => {
    setSelectedRfq(rfq);
    setShowDetailsModal(true);
  };

  const openBidModal = (e, rfq) => {
    e.stopPropagation();
    setSelectedRfq(rfq);
    setShowBidModal(true);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Supplier Dashboard</h1>
          <p className="text-slate-500 mt-1">Browse open RFQs and submit your bids</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/supplier/selectedRFQs")}
            className="gap-2"
          >
            <MdAssignment className="text-lg" />
            Selected RFQs
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/supplier/submittedbids")}
            className="gap-2"
          >
            <MdHistory className="text-lg" />
            View My Bids
          </Button>
        </div>
      </div>

      {/* Open RFQs section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Open Opportunities</h2>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : rfqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No open RFQs available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rfqs.map((rfq) => (
              <Card 
                key={rfq._id} 
                hover
                className="p-5 flex flex-col h-full cursor-pointer transition-transform active:scale-[0.99]"
                onClick={() => openDetails(rfq)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">{rfq.title}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium capitalize">
                    Open
                  </span>
                </div>
                
                <p className="text-slate-500 text-sm line-clamp-3 mb-4 flex-1">
                  {rfq.description}
                </p>
                
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Quantity: <span className="font-medium text-slate-700">{rfq.quantity}</span></span>
                    <span>Deadline: <span className="font-medium text-slate-700">{new Date(rfq.deadline).toLocaleDateString()}</span></span>
                  </div>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full gap-2"
                    onClick={(e) => openBidModal(e, rfq)}
                  >
                    <MdGavel className="text-lg" />
                    Submit Bid
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* RFQ Details Modal */}
      <Modals
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        title="RFQ Details"
      >
        {selectedRfq && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">{selectedRfq.title}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium capitalize">
                  {selectedRfq.status}
                </span>
                <span className="text-sm text-slate-500">
                  Deadline: {new Date(selectedRfq.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <h4 className="text-sm font-semibold text-slate-700 mb-1">Description</h4>
              <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed">
                {selectedRfq.description}
              </p>
            </div>

            <div className="flex justify-between items-center text-sm text-slate-600 border-t border-slate-100 pt-3">
              <span>Quantity Required: <span className="font-semibold text-slate-900">{selectedRfq.quantity}</span></span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <Button
                variant="ghost"
                onClick={() => setShowDetailsModal(false)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowDetailsModal(false);
                  setShowBidModal(true);
                }}
              >
                Submit Bid
              </Button>
            </div>
          </div>
        )}
      </Modals>

      {/* Submit Bid Modal */}
      <Modals
        isOpen={showBidModal}
        onClose={() => setShowBidModal(false)}
        title="Submit Your Bid"
      >
        {selectedRfq && (
          <SubmitBid
            rfq={selectedRfq}
            onSuccess={() => {
              setShowBidModal(false);
              fetchRFQs();
            }}
            onClose={() => setShowBidModal(false)}
          />
        )}
      </Modals>
    </DashboardLayout>
  );
};

export default SupplierDashboard;
