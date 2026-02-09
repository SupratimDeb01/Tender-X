import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast, { Toaster } from "react-hot-toast";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { MdFileDownload, MdVerified } from "react-icons/md";

const AcceptBids = () => {
  const [acceptedBids, setAcceptedBids] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch accepted bids
  const fetchAcceptedBids = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.BID.GET_ACCEPTED());
      setAcceptedBids(res.data);
    } catch (error) {
      console.error("Error fetching accepted bids:", error);
      toast.error("Failed to fetch accepted bids");
    }
  };

  // Fetch invoices
  const fetchInvoices = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.INVOICE.GET_ALL);
      setInvoices(res.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      toast.error("Failed to fetch invoices");
    }
  };

  useEffect(() => {
    Promise.all([fetchAcceptedBids(), fetchInvoices()]).finally(() =>
      setLoading(false)
    );
  }, []);

  // Download invoice
  const downloadInvoice = async (id) => {
    try {
      const res = await axiosInstance.get(API_PATHS.INVOICE.DOWNLOAD(id), {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Invoice downloaded successfully");
    } catch (error) {
      console.error("Error downloading invoice:", error);
      toast.error("Failed to download invoice");
    }
  };

  // Verify invoice
  const verifyInvoice = async (invoiceId) => {
    try {
      await axiosInstance.put(API_PATHS.INVOICE.VERIFY(invoiceId));
      toast.success("Invoice verified successfully");

      // Refresh invoices after verification
      fetchInvoices();
    } catch (error) {
      console.error("Error verifying invoice:", error);
      toast.error("Failed to verify invoice");
    }
  };

  // Helper: find invoice for a PO
  const getInvoiceForPO = (poId) => {
    return invoices.find(
      (inv) => inv.po === poId || inv.po?._id === poId
    );
  };

  return (
    <DashboardLayout>
      <Toaster position="bottom-center" reverseOrder={false} />
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Accepted Bids</h2>
        <p className="text-slate-500 mt-1">Manage accepted bids and verify invoices</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      ) : acceptedBids.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500">No accepted bids found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {acceptedBids.map((bid) => {
            const invoice = getInvoiceForPO(bid.po?._id);

            return (
              <Card key={bid._id} className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg text-slate-900">{bid.rfq?.title || "Unknown RFQ"}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Accepted</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2 text-sm text-slate-600 mt-2">
                    <div>
                      <span className="block text-xs text-slate-400 uppercase tracking-wider">Supplier</span>
                      {bid.supplier?.name || "Unknown"}
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 uppercase tracking-wider">Unit Price</span>
                      ${bid.unitPrice}
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 uppercase tracking-wider">Quantity</span>
                      {bid.rfq?.quantity}
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400 uppercase tracking-wider">Total</span>
                      <span className="font-medium text-slate-900">${bid.total}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto justify-end">
                  {invoice ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadInvoice(invoice._id)}
                        className="gap-2"
                      >
                        <MdFileDownload className="text-lg" />
                        Invoice
                      </Button>

                      {invoice.status === "verified" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled
                          className="gap-2 text-green-600 bg-green-50"
                        >
                          <MdVerified className="text-lg" />
                          Verified
                        </Button>
                      )}
                    </>
                  ) : (
                    <span className="text-sm text-slate-400 italic px-3 py-1.5 bg-slate-50 rounded-md border border-slate-100">
                      Invoice pending
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AcceptBids;
