import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  User2,
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import useMyContext from "@/hooks/useMyContext";

// Mock: set to true to view as teacher, false as student

// Mock request data
const request = {
  id: 1,
  title: "Learn React Basics",
  description:
    "I want to understand React fundamentals, including components, props, and state. Looking for a focused, hands-on session.",
  fee: 500,
  preferredTime: "2024-06-12T18:00",
  createdAt: "2024-06-01T10:00",
};

// Mock offers data
const offers = [
  {
    id: 1,
    teacher: "Mr. Sharma",
    fee: 500,
    time: "2024-06-12T18:00",
    message: "I can help you master React basics in one session!",
    accepted: false,
  },
  {
    id: 2,
    teacher: "Ms. Gupta",
    fee: 450,
    time: "2024-06-13T17:00",
    message: "Let's do a practical session with live coding.",
    accepted: false,
  },
  {
    id: 3,
    teacher: "Mr. Verma",
    fee: 600,
    time: "2024-06-14T19:00",
    message: "I have 5+ years of experience teaching React.",
    accepted: false,
  },
];

function OfferTile({ offer, onAccept, accepted }) {
  
  return (
    <div
      className={`relative bg-white border border-neutral-100 rounded-2xl shadow-sm p-6 flex flex-col gap-3 transition-all duration-200 hover:shadow-lg ${
        accepted ? "ring-2 ring-green-500" : ""
      }`}
      style={{ minHeight: 180 }}
    >
      <div className="flex items-center gap-2 mb-1">
        <User2 className="text-green-600" size={20} />
        <span className="font-semibold text-neutral-800 text-base tracking-tight">
          {offer.teacher}
        </span>
        {accepted && (
          <CheckCircle2
            className="text-green-500 ml-2"
            size={18}
            title="Accepted"
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4 text-sm text-neutral-500 mb-1">
        <span className="flex items-center gap-1">
          <IndianRupee size={16} /> {offer.fee}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={16} /> {offer.time.replace("T", " ")}
        </span>
      </div>
      <div className="text-neutral-700 italic mb-2 leading-relaxed">
        {offer.message}
      </div>
      {!accepted && (
        <Button
          className="w-fit bg-green-600 text-white hover:bg-green-700 rounded-full px-6 py-2 text-sm font-medium shadow-none"
          onClick={() => onAccept(offer)}
        >
          Accept Offer
        </Button>
      )}
      {accepted && (
        <div className="absolute top-4 right-4 text-green-500 text-xs font-semibold">
          Accepted
        </div>
      )}
    </div>
  );
}

function OfferForm({ onSubmit, loading }) {
  const [form, setForm] = useState({ fee: "", time: "", message: "" });
  const [error, setError] = useState("");
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fee || !form.time || !form.message) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSubmit(form);
    setForm({ fee: "", time: "", message: "" });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 max-w-lg mx-auto mt-10"
    >
      <h2 className="text-xl font-bold text-green-700 mb-2 tracking-tight">
        Send Your Offer
      </h2>
      <div className="flex flex-col gap-3">
        <Input
          name="fee"
          placeholder="Fee (₹)"
          type="number"
          value={form.fee}
          onChange={handleChange}
          required
          min={0}
          className="rounded-lg border-neutral-200 focus:border-green-400 focus:ring-green-100"
        />
        <Input
          name="time"
          placeholder="Preferred Time"
          type="datetime-local"
          value={form.time}
          onChange={handleChange}
          required
          className="rounded-lg border-neutral-200 focus:border-green-400 focus:ring-green-100"
        />
        <textarea
          name="message"
          placeholder="Message for the student"
          value={form.message}
          onChange={handleChange}
          required
          className="border rounded-lg px-3 py-2 text-base shadow-xs focus:border-green-400 focus:ring-green-100 outline-none min-h-[60px] resize-y bg-neutral-50"
        />
      </div>
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <Button
        type="submit"
        className="w-full bg-green-600 text-white hover:bg-green-700 rounded-full px-6 py-2 text-base font-semibold shadow-none mt-2"
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Offer"}
      </Button>
    </form>
  );
}

export default function RequestDetails() {
  const [offersList, setOffersList] = useState(offers);
  const [acceptedOfferId, setAcceptedOfferId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, offerDb } = useMyContext();
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const isteacher = user?.role === "teacher";
    setIsTeacher(isteacher);
  }, [user]);

  const handleAccept = (offer) => {
    setAcceptedOfferId(offer.id);
    setOffersList((prev) =>
      prev.map((o) => ({ ...o, accepted: o.id === offer.id }))
    );
    toast.success("Offer accepted! You can now chat with the teacher.");
  };

  const handleOfferSubmit = async (formdata) => {
    setLoading(true);
    try {
      const res = await offerDb.createOffer(formdata);
      console.log(res)
      toast.success("Offer sent to the student!");
    } catch (error) {
      console.error(error);
      toast.error("Error sending offer to the student!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-2 md:px-0">
      {/* Request Card */}
      <div className="bg-gradient-to-br from-green-50 via-white to-green-100 border border-green-100 rounded-3xl shadow-lg p-10 mb-12 flex flex-col gap-5">
        <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-1 tracking-tight leading-tight">
          {request.title}
        </h1>
        <div className="text-lg text-neutral-700 mb-2 leading-relaxed">
          {request.description}
        </div>
        <div className="flex flex-wrap gap-8 text-base text-neutral-500">
          <span className="flex items-center gap-2">
            <IndianRupee size={18} />
            <span className="font-semibold text-green-700">{request.fee}</span>
          </span>
          <span className="flex items-center gap-2">
            <Clock size={18} /> {request.preferredTime.replace("T", " ")}
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={18} /> {request.createdAt.replace("T", " ")}
          </span>
        </div>
      </div>

      {/* Student: Offers List */}
      {!isTeacher && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 tracking-tight">
            Offers from Teachers
          </h2>
          {offersList.length === 0 ? (
            <div className="text-neutral-400 text-center py-20 text-lg">
              No offers yet. Please wait for teachers to respond.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offersList.map((offer) => (
                <OfferTile
                  key={offer.id}
                  offer={offer}
                  onAccept={handleAccept}
                  accepted={offer.accepted || offer.id === acceptedOfferId}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Teacher: Offer Form */}
      {isTeacher && (
        <OfferForm onSubmit={handleOfferSubmit} loading={loading} />
      )}
    </div>
  );
}
