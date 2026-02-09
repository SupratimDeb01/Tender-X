import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { MdOutlineAddBox, MdCheckCircle } from "react-icons/md";
import Modals from '../../components/Modals';
import CreateRFQ from '../Home/CreateRfq';
import { UserContext } from '../../context/userContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [allRfq, setAllRfq] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const navigate = useNavigate();

  const fetchAllRequests = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RFQ.GET_MY_RFQS);
      console.log("RFQs fetched:", response.data);
      setAllRfq(response.data);
    } catch (error) {
      console.error("Error loading RFQs", error);
    }
  };

  useEffect(() => {
    if (user?.role !== "manufacturer") {
      navigate("/dashboard/supplier"); // redirect if not manufacturer
    } else {
      fetchAllRequests();
    }
  }, [user]);

  return (
    <DashboardLayout>
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My RFQs</h2>
          <p className="text-slate-500 mt-1">Manage your requests for quotation</p>
        </div>
        
        <div className='flex gap-3'>
          <Button 
            variant="outline"
            onClick={() => navigate("/dashboard/manufacturer/acceptedbids")}
            className="gap-2"
          >
            <MdCheckCircle className="text-lg" />
            Accepted Bids
          </Button>
          
          <Button
            variant="primary"
            onClick={() => setCreateModal(true)}
            className="gap-2"
          >
            <MdOutlineAddBox className="text-lg" />
            Create RFQ
          </Button>
        </div>
      </div>

      {/* RFQ List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allRfq.length > 0 ? (
          allRfq.map((rfq) => (
            <Card
              key={rfq._id}
              hover
              onClick={() => navigate(`/rfq/${rfq._id}`)}
              className="p-5 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-slate-900 line-clamp-1">{rfq.title}</h3>
                {(() => {
                  const isExpired = new Date(rfq.deadline) < new Date() && rfq.status === "open";
                  const displayStatus = isExpired ? "Expired" : rfq.status;
                  const statusColor = 
                    displayStatus === "open" ? "bg-green-100 text-green-700" :
                    displayStatus === "Expired" ? "bg-red-100 text-red-700" :
                    "bg-slate-100 text-slate-600";
                  
                  return (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}>
                      {displayStatus}
                    </span>
                  );
                })()}
              </div>
              
              <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
                {rfq.description || "No description provided."}
              </p>
              
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
                <span>Created: {new Date(rfq.createdAt).toLocaleDateString()}</span>
                <span className="font-medium text-indigo-600">View Details &rarr;</span>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <MdOutlineAddBox className="text-3xl text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No RFQs yet</h3>
            <p className="text-slate-500 mt-1 mb-4">Create your first request for quotation to get started.</p>
            <Button variant="primary" onClick={() => setCreateModal(true)}>
              Create RFQ
            </Button>
          </div>
        )}
      </div>

      {/* Create RFQ Modal */}
      <Modals
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        hideHeader
      >
        <CreateRFQ onSuccess={() => { setCreateModal(false); fetchAllRequests(); }} />
      </Modals>
    </DashboardLayout>
  );
};

export default Dashboard;
