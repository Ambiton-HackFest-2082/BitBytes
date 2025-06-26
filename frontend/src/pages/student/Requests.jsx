import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Eye, Trash2, X, Plus } from "lucide-react";
import { Toaster, toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/alert-dialog";

// RequestCard component
function RequestCard({ request, onEdit, onView, onDelete, onCloseRequest }) {
  const [hovered, setHovered] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [closeDialogOpen, setCloseDialogOpen] = useState(false);
  return (
    <div
      className="relative bg-white border border-neutral-100 rounded-xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-neutral-800 text-base truncate max-w-[70%]">
          {request.title}
        </span>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
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
      <div className="text-neutral-500 text-sm mb-1 truncate">
        {request.description}
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-neutral-400 mb-2">
        <span>
          Fee:{" "}
          <span className="text-green-600 font-semibold">₹{request.fee}</span>
        </span>
        <span>Preferred: {request.preferredTime}</span>
        <span>
          Offers:{" "}
          <span className="text-green-600 font-semibold">{request.offers}</span>
        </span>
      </div>
      <div className="flex gap-2 mt-auto">
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
        >
          <Button
            size="sm"
            className="mt-2 bg-green-600 text-white px-4 py-2 hover:bg-green-700 flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setCloseDialogOpen(true);
            }}
            disabled={request.status === "Closed"}
            type="button"
          >
            Close Request
          </Button>
        </ConfirmDialog>
        <div className="flex gap-1 ml-auto">
          <Button
            size="icon"
            variant="ghost"
            className={`transition-opacity ${
              hovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } text-neutral-400 ${
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
          <Button
            size="icon"
            variant="ghost"
            className={`transition-opacity ${
              hovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            } text-neutral-400 hover:text-green-600`}
            onClick={() => onView(request)}
          >
            <Eye size={18} />
          </Button>
          <ConfirmDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            title="Delete Request?"
            description="Are you sure you want to delete this request? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={() => {
              setDeleteDialogOpen(false);
              onDelete(request);
            }}
            onCancel={() => setDeleteDialogOpen(false)}
          >
            <Button
              size="icon"
              variant="ghost"
              className={`transition-opacity ${
                hovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              } text-neutral-400 hover:text-red-500`}
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

// Main Requests Page
const initialRequests = [
  {
    id: 1,
    title: "Learn React Basics",
    description: "Need help with React fundamentals.",
    fee: 500,
    preferredTime: "2024-06-10T18:00",
    status: "Open",
    offers: 2,
  },
  {
    id: 2,
    title: "Math Tutoring",
    description: "Algebra and calculus doubts.",
    fee: 700,
    preferredTime: "2024-06-12T10:00",
    status: "Offer Accepted",
    offers: 3,
  },
  {
    id: 3,
    title: "Physics Doubts",
    description: "Mechanics and optics.",
    fee: 400,
    preferredTime: "2024-06-15T14:00",
    status: "Open",
    offers: 1,
  },
  {
    id: 4,
    title: "Python Basics",
    description: "Want to learn Python from scratch.",
    fee: 600,
    preferredTime: "2024-06-18T09:00",
    status: "Closed",
    offers: 0,
  },
  {
    id: 5,
    title: "English Grammar",
    description: "Improve grammar skills.",
    fee: 300,
    preferredTime: "2024-06-20T17:00",
    status: "Open",
    offers: 2,
  },
  {
    id: 6,
    title: "History Help",
    description: "Need help with world history.",
    fee: 350,
    preferredTime: "2024-06-22T11:00",
    status: "Open",
    offers: 1,
  },
  {
    id: 7,
    title: "JavaScript Advanced",
    description: "Async/await, closures, etc.",
    fee: 800,
    preferredTime: "2024-06-25T21:00",
    status: "Open",
    offers: 4,
  },
];

export default function Requests() {
  const [requests, setRequests] = useState(initialRequests);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editRequest, setEditRequest] = useState(null);

  // Handlers
  const handleCreate = (data) => {
    if (editRequest) {
      setRequests((prev) =>
        prev.map((r) => (r.id === editRequest.id ? { ...r, ...data } : r))
      );
      toast.success("Request updated successfully!");
      setEditRequest(null);
    } else {
      setRequests((prev) => [
        {
          ...data,
          id: Date.now(),
          status: "Open",
          offers: 0,
        },
        ...prev,
      ]);
      toast.success("Request created successfully!");
    }
  };
  const handleEdit = (req) => {
    setEditRequest(req);
    setDrawerOpen(true);
  };
  const handleView = () => toast.info("View feature coming soon!");
  const handleDelete = (req) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    toast.success("Request deleted.");
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
      {requests.length === 0 ? (
        <div className="text-neutral-400 text-center py-16">
          No requests found.{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.slice(0, 6).map((req) => (
            <RequestCard
              key={req.id}
              request={req}
              onEdit={handleEdit}
              onView={handleView}
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
