import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast, { Toaster } from "react-hot-toast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { MdDescription, MdReceipt, MdCheckCircle, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SelectedRfqs = () => {
  const [selectedRfqs, setSelectedRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSelectedRfqs = async () => {
    try {
      const { data } = await axiosInstance.get(
        API_PATHS.BID.GET_SELECTED_FOR_SUPPLIER()
      );
      setSelectedRfqs(data || []);
    } catch (error) {
      console.error("Error fetching selected RFQs:", error);
      setSelectedRfqs([]);
      toast.error("Failed to fetch selected RFQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectedRfqs();
  }, []);

  const handleDownloadPO = async (poId) => {
    if (!poId) return;

    try {
      const response = await axiosInstance.get(API_PATHS.PO.DOWNLOAD(poId), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `PO_${poId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("PO downloaded successfully!");
    } catch (error) {
      console.error("Error downloading PO:", error);
      toast.error("Failed to download PO");
    }
  };

  const handleIssueInvoice = async (poId) => {
    try {
      // fetch PO details first
      const { data: po } = await axiosInstance.get(API_PATHS.PO.GET_BY_ID(poId));

      const invoiceData = {
        poId: poId,
        items: po.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
        totalAmount: po.items.reduce(
          (sum, i) => sum + i.quantity * i.unitPrice,
          0
        ),
      };

      const { data: invoice } = await axiosInstance.post(
        API_PATHS.INVOICE.SUBMIT,
        invoiceData
      );

      toast.success("Invoice issued successfully!");
      console.log("Created invoice:", invoice);
    } catch (error) {
      console.error(error);
      toast.error("Failed to issue invoice");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Selected RFQs</h1>
            <p className="text-slate-500 mt-1">Manage your awarded contracts and purchase orders</p>
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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : selectedRfqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">No selected RFQs yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {selectedRfqs.map((bid) => {
              const rfq = bid.rfq || {};
              const poId =
                bid.po?._id || (typeof bid.po === "string" ? bid.po : null);

              return (
                <Card
                  key={bid._id}
                  className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-semibold text-lg text-slate-900">
                        {rfq.title || "No title"}
                      </h2>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <MdCheckCircle /> Awarded
                      </span>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-md mb-3 border border-slate-100">
                      <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Summary</h4>
                      <p className="text-slate-700 text-sm whitespace-pre-wrap">
                        {rfq.description || "No description provided."}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                      <span>Quantity: <span className="font-medium text-slate-700">{rfq.quantity ?? "-"}</span></span>
                      <span>Deadline: <span className="font-medium text-slate-700">{rfq.deadline ? new Date(rfq.deadline).toLocaleDateString() : "-"}</span></span>
                      <span>Unit Price: <span className="font-medium text-slate-700">${bid.unitPrice ?? "-"}</span></span>
                      <span>Total Value: <span className="font-medium text-slate-700">${bid.total ?? "-"}</span></span>
                      
                      <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
                        <span>Payment:</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          (bid.po?.paymentStatus || "Pending") === 'Paid' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {bid.po?.paymentStatus || "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDownloadPO(poId)}
                      disabled={!poId}
                      className="gap-2 justify-center"
                    >
                      <MdDescription className="text-lg" />
                      Download PO
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIssueInvoice(poId)}
                      className="gap-2 justify-center text-green-600 border-green-600 hover:bg-green-50 focus:ring-green-500"
                    >
                      <MdReceipt className="text-lg" />
                      Issue Invoice
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SelectedRfqs;
