import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, Trash2, X, Plus } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/alert-dialog";
import useMyContext from "@/hooks/useMyContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// RequestCard component
function RequestCard({ request, onEdit, onView, onDelete, onCloseRequest }) {
  const [hovered, setHovered] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="relative bg-white border cursor-pointer border-neutral-100 rounded-xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div onClick={() => navigate(`/request-details/${request._id}`)}>
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-neutral-800 text-base truncate max-w-[70%]">
            {request.topic}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full font-semibold ${
              request.status === "Open"
                ? "bg-green-50 text-green-600"
                : request.status === "Closed"
                ? "bg-neutral-200 text-neutral-500"
                : "bg-green-500 text-white"
            }`}
          >
            {request.status}
          </span>
        </div>
        <div className="text-neutral-500 mb-1 truncate">
          {request.description}
        </div>
        <div className="flex flex-col text-neutral-400">
          <span>
            Fee:{" "}
            <span className="text-green-600 font-semibold">
              ₹{request.budget}
            </span>
          </span>
          <div className="flex items-center justify-between">
            <p>
              Preferred: <span className="text-gray-500">{new Date(request.appointmentTime).toLocaleString()}</span>
            </p>
            <div className="flex gap-2">
              <ConfirmDialog
                open={closeDialogOpen}
                onOpenChange={setCloseDialogOpen}
                title="Close Request?"
                description="Are you sure you want to close this request? You won't be able to reopen it."
                confirmText="Close"
                cancelText="Cancel"
                onConfirm={() => {
                  setCloseDialogOpen(false);
                  onCloseRequest(request);
                }}
                onCancel={() => setCloseDialogOpen(false)}
              ></ConfirmDialog>
              <div className="flex gap-1 ml-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  className={`transition-opacity text-neutral-400 ${
                    request.status === "Closed"
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:text-green-600"
                  }`}
                  onClick={() => {
                    if (request.status === "Closed") {
                      toast.error("Cannot edit a closed request.");
                      return;
                    }
                    onEdit(request);
                  }}
                  disabled={request.status === "Closed"}
                >
                  <Pencil size={18} />
                </Button>
                {/* <Button
            size="icon"
            variant="ghost"
            className={`transition-opacity ${
              hovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } text-neutral-400 hover:text-green-600`}
            onClick={() => onView(request)}
          >
            <Eye size={18} />
          </Button> */}
                <ConfirmDialog
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                  title="Delete Request?"
                  description="Are you sure you want to delete this request? This action cannot be undone."
                  confirmText="Delete"
                  cancelText="Cancel"
                  onConfirm={() => {
                    setDeleteDialogOpen(false);
                    onDelete(request._id);
                  }}
                  onCancel={() => setDeleteDialogOpen(false)}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`transition-opacity text-neutral-400 hover:text-red-500`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteDialogOpen(true);
                    }}
                    type="button"
                  >
                    <Trash2 size={18} />
                  </Button>
                </ConfirmDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// RequestForm component
function RequestForm({ onSubmit, onClose, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      title: "",
      description: "",
      fee: "",
      preferredTime: "",
    }
  );
  const [error, setError] = useState("");
  React.useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.fee || !form.preferredTime) {
      setError("All fields are required.");
      return;
    }
    if (initialData && initialData.status === "Closed") {
      toast.error("Cannot update a closed request.");
      return;
    }
    setError("");
    onSubmit(form);
    setForm({ title: "", description: "", fee: "", preferredTime: "" });
    onClose();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-2">
      <Input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        className="border rounded-md px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none min-h-[80px] resize-y"
      />
      <Input
        name="fee"
        placeholder="Fee (₹)"
        type="number"
        value={form.fee}
        onChange={handleChange}
        required
        min={0}
      />
      <Input
        name="preferredTime"
        placeholder="Preferred Time"
        type="datetime-local"
        value={form.preferredTime}
        onChange={handleChange}
        required
      />
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <Button
        type="submit"
        className="w-full bg-green-600 text-white hover:bg-green-700"
      >
        {initialData ? "Update Request" : "Create Request"}
      </Button>
    </form>
  );
}

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const { postDb } = useMyContext();

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const allPosts = await postDb.fetchPosts();
        if (allPosts) {
          setRequests(allPosts);
        } else {
          toast.error("Failed to fetch requests.");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
        toast.error("Error fetching requests.");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  // Handlers
  const handleCreate = async (data) => {
    try {
      setLoading(true);
      const newRequest = await postDb.createPost(data);
      console.log("New Request:", newRequest);
      setRequests((prev) => [newRequest, ...prev]);
      toast.success("Request created successfully!");
      if (!newRequest) {
        toast.error("Failed to create request.");
        return;
      }
    } catch (error) {
      console.error("Error creating request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (req) => {
    setEditRequest(req);
    setDrawerOpen(true);
  };

  const handleDelete = async (reqId) => {
    setRequests((prev) => prev.filter((r) => r._id !== reqId));
    try {
      await postDb.deletePost(reqId);
    } catch (error) {
      toast.error("Failed to delete request.");
      console.error("Error deleting request:", error);
    }
  };
  const handleCloseRequest = (req) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: "Closed" } : r))
    );
    toast.success("Request closed.");
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1 tracking-tight">
            Requested Topics
          </h1>
          <p className="text-neutral-500 text-base md:text-lg">
            Here are your latest learning requests. Review responses from
            teachers or post a new request to get personalized help on any
            topic.
          </p>
        </div>
        <Button
          onClick={() => {
            setDrawerOpen(true);
            setEditRequest(null);
          }}
          className="bg-green-600 text-white hover:bg-green-700 flex items-center gap-2"
        >
          <Plus size={18} /> Create New
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="text-neutral-400 text-center py-16">
          No requests found.{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.slice(0, 6).map((req) => (
            <RequestCard
              key={req._id}
              request={req}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onCloseRequest={handleCloseRequest}
            />
          ))}
        </div>
      )}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="max-w-md w-full">
          <SheetHeader>
            <SheetTitle>
              {editRequest ? "Edit Request" : "Create New Request"}
            </SheetTitle>
          </SheetHeader>
          <RequestForm
            onSubmit={handleCreate}
            onClose={() => {
              setDrawerOpen(false);
              setEditRequest(null);
            }}
            initialData={editRequest}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
