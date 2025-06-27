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
import { useParams } from "react-router-dom";
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

function OfferTile({ offer, onAccept, clicking, accepted }) {
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
          {offer?.offeredBy.fullName}
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
          <IndianRupee size={16} /> {offer?.proposed_price}
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={16} />{" "}
          {new Date(offer?.appointmentTime).toLocaleString()}
        </span>
      </div>
      <div className="text-neutral-700 italic mb-2 leading-relaxed">
        {offer?.message}
      </div>
      {!accepted && (
        <Button
          className="w-fit bg-green-600 cursor-pointer text-white hover:bg-green-700 rounded-full px-6 py-2 text-sm font-medium shadow-none"
          onClick={() => onAccept(offer?._id)}
        >
          {clicking ? (
            <span className="animate-pulse">Accepting...</span>
          ) : (
            <span>Accept Offer</span>
          )}
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
  const [offersList, setOffersList] = useState([]);
  const [acceptedOfferId, setAcceptedOfferId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, offerDb, postDb } = useMyContext();
  const [isTeacher, setIsTeacher] = useState(false);
  const [request, setRequest] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const isteacher = user?.role === "teacher";
    setIsTeacher(isteacher);
  }, [user]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        console.log(id);
        const res = await postDb.fetchPostDetail(id);
        setRequest(res);
        console.log("Request details:", res);
      } catch (error) {
        console.error("Error fetching offers:", error);
        toast.error("Failed to load offers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetails();
  }, [id]);

  useEffect(() => {
    const fetchSubmittedOffer = async () => {
      if (!isTeacher) return; // Only fetch for teachers
      setLoading(true);
      try {
        const res = await offerDb.fetchOfferByReqId(id);
        console.log(("Submitted offer:", res));
        if (res) {
          setSubmitted(true);
        } else {
          setSubmitted(false);
        }
      } catch (error) {
        console.error("Error fetching submitted offer:", error);
        toast.error(
          "Failed to load your submitted offer. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedOffer();
  }, [user, isTeacher, id]);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const res = await offerDb.fetchOffersByReqId(id);
        setOffersList(res);
        console.log("Offer details:", res);
      } catch (error) {
        console.error("Error fetching offers:", error);
        toast.error("Failed to load offers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, [id]);

  const handleOfferSubmit = async (formdata) => {
    setLoading(true);
    try {
      const res = await offerDb.createOffer({
        ...formdata,
        reqId: id,
        studentId: request?.studentDetail._id,
      });
      console.log(res);
      toast.success("Offer sent to the student!");
    } catch (error) {
      console.error(error);
      toast.error("Error sending offer to the student!");
    } finally {
      setLoading(false);
    }
  };

  const handleAccpetOffer = async (offerId) => {
    setAcceptedOfferId(offerId);
    try {
      const res = await offerDb.acceptOffer(offerId);
      console.log("Offer accepted:", res);
      toast.success("Offer accepted successfully!");
      // Optionally, you can refresh the offers list or update the state
      setOffersList((prev) =>
        prev.map((offer) =>
          offer._id === offerId ? { ...offer, status: "Accepted" } : offer
        )
      );
    } catch (error) {
      console.error("Error accepting offer:", error);
      toast.error("Failed to accept the offer. Please try again.");
    } finally {
      setAcceptedOfferId(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-2 md:px-0">
      {/* Request Card */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500"></div>
        </div>
      ) : (
        <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 mb-10">
          <h1 className="text-2xl font-bold text-neutral-800 mb-  4 tracking-tight">
            {request?.topic}
          </h1>
          <p className="text-neutral-600 mb-4">{request?.description}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
            <span className="flex items-center gap-1">
              <IndianRupee size={16} /> {request?.budget}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} />{" "}
              {new Date(request?.appointmentTime).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <User2 className="text-green-600" size={20} />
            <span className="font-semibold text-neutral-800 text-base tracking-tight">
              {request?.studentDetail.fullName}
            </span>
          </div>
          <div className="text-neutral-500 text-sm mt-2">
            <span className="italic">
              Posted on: {new Date(request?.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Student: Offers List */}
      {!isTeacher && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-8 tracking-tight">
            Offers from Teachers
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-green-500"></div>
            </div>
          ) : offersList.length === 0 ? (
            <div className="text-neutral-400 text-center py-20 text-lg">
              No offers yet. Please wait for teachers to respond.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {offersList.map((offer) => (
                <OfferTile
                  key={offer._id}
                  offer={offer}
                  onAccept={handleAccpetOffer}
                  accepted={offer.status === "Accepted"}
                  clicking={acceptedOfferId === offer._id}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Teacher: Offer Form */}
      {isTeacher &&
        (submitted ? (
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-sm p-8 mt-10">
            <h2 className="text-2xl font-bold text-neutral-800 mb-4 tracking-tight">
              Your Offer
            </h2>
            <p className="text-neutral-600 mb-4">
              You have already submitted an offer for this request.
            </p>
            <p className="text-neutral-500 text-sm">
              Please wait for the student to respond.
            </p>
          </div>
        ) : (
          <OfferForm onSubmit={handleOfferSubmit} loading={loading} />
        ))}
    </div>
  );
}
