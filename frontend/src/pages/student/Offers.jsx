import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar as CalendarIcon } from "lucide-react";
import useMyContext from "@/hooks/useMyContext";
import { NavLink } from "react-router-dom";

function OfferChatCard({ offer, onChat }) {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-neutral-800 text-base text-md max-w-[70%]">
          {offer.post.topic}
        </span>
        <NavLink to={`/request-details/${offer.post._id}`} className="font-semibold text-neutral-800 text-base text-md">
          View Post
        </NavLink>
      </div>
      <div className="text-neutral-500 text-md mb-1 truncate">
        Teacher:{" "}
        <span className="font-semibold text-green-700">
          {offer.offeredBy.fullName}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 text-md text-neutral-400 mb-2">
        <span>
          Fee:{" "}
          <span className="text-green-600 font-semibold">
            ₹{offer.proposed_price}
          </span>
        </span>
        <span>Time: {new Date(offer.appointmentTime).toLocaleString()}</span>
      </div>
      <div className="text-neutral-500 text-md mb-1 truncate">
        Message: <span className="">{offer.message}</span>
      </div>
      <Button
        // size="sm"
        className="mt-2 bg-green-600 text-white px-4 py-2 hover:bg-green-700 flex items-center gap-2 cursor-pointer"
        onClick={() => onChat(offer)}
      >
        <MessageCircle size={18} /> Chat
      </Button>
    </div>
  );
}

function AppointmentBox({ appointment, status, onConfirm, onReject }) {
  return (
    <div className="mb-4 p-4 rounded-xl border border-green-200 bg-green-50 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
        <CalendarIcon size={16} /> Appointment
      </div>
      <div>
        <span className="font-medium">Link: </span>
        <a
          href={appointment.link}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-green-700 break-all"
        >
          {appointment.link}
        </a>
      </div>
      {appointment.credential && (
        <div>
          <span className="font-medium">Password: </span>
          {appointment.credential}
        </div>
      )}
      {status === "pending" && (
        <div className="flex gap-2 mt-2">
          <Button
            className="bg-green-600 text-white hover:bg-green-700 rounded-full px-5 py-1 text-sm"
            onClick={onConfirm}
          >
            Confirm
          </Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600 rounded-full px-5 py-1 text-sm"
            onClick={onReject}
          >
            Reject
          </Button>
        </div>
      )}
      {status === "confirmed" && (
        <div className="mt-2 text-green-600 font-semibold text-sm">
          Confirmed
        </div>
      )}
      {status === "rejected" && (
        <div className="mt-2 text-red-500 font-semibold text-sm">Rejected</div>
      )}
    </div>
  );
}

function ChatDrawer({ open, onOpenChange, offer, onSendMessage }) {
  const [input, setInput] = useState("");
  // Find the latest appointment message, if any
  const appointmentMsg = offer?.messages
    ?.slice()
    .reverse()
    .find((m) => m.type === "appointment");
  // Store appointment status in local state (per offer)
  const [appointmentStatus, setAppointmentStatus] = useState("pending");

  // Reset status when offer changes
  React.useEffect(() => {
    setAppointmentStatus("pending");
  }, [offer?.id, appointmentMsg?.link]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="max-w-md w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Chat with {offer?.teacher}</SheetTitle>
          <div className="text-xs text-neutral-400 mt-1">
            For request:{" "}
            <span className="font-semibold">{offer?.requestTitle}</span>
          </div>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto my-4 px-1">
          {/* Appointment box if present */}
          {appointmentMsg && (
            <AppointmentBox
              appointment={appointmentMsg}
              status={appointmentStatus}
              onConfirm={() => setAppointmentStatus("confirmed")}
              onReject={() => setAppointmentStatus("rejected")}
            />
          )}
          {offer?.messages?.length === 0 ? (
            <div className="text-neutral-400 text-center mt-8">
              No messages yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {offer?.messages?.map((msg, idx) =>
                msg.type === "appointment" ? null : (
                  <div
                    key={idx}
                    className={`max-w-[80%] px-3 py-2 rounded-lg text-sm shadow-sm ${
                      msg.sender === "student"
                        ? "bg-green-50 self-end text-green-900"
                        : "bg-neutral-100 self-start text-neutral-700"
                    }`}
                  >
                    {msg.text}
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <form
          onSubmit={handleSend}
          className="flex gap-2 border-t pt-3 bg-white"
        >
          <input
            className="flex-1 border rounded-md px-3 py-2 text-base shadow-xs focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-green-600 text-white hover:bg-green-700 px-4"
            disabled={!input.trim()}
          >
            Send
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default function Offers() {
  const [chatDrawer, setChatDrawer] = useState({ open: false, offer: null });
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { offerDb } = useMyContext();

  const handleOpenChat = (offer) => {
    setChatDrawer({ open: true, offer });
  };
  const handleCloseChat = () => {
    setChatDrawer({ open: false, offer: null });
  };
  const handleSendMessage = (msg) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === chatDrawer.offer.id
          ? {
              ...o,
              messages: [...o.messages, { sender: "student", text: msg }],
            }
          : o
      )
    );
    setChatDrawer((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        messages: [...prev.offer.messages, { sender: "student", text: msg }],
      },
    }));
  };

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      try {
        const response = await offerDb.fetchOffers();
        setOffers(response);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="w-full ">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1 tracking-tight">
          Accepted Offers
        </h1>
        <p className="text-neutral-500 text-base md:text-lg">
          Here are the teachers you've chosen for your learning requests. Click
          ‘Chat’ to stay connected and prepare for your upcoming sessions.
        </p>
      </div>
      {offers.length === 0 ? (
        <div className="text-neutral-400 text-center py-16">
          No accepted offers yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 text-center text-neutral-500">
              Loading offers...
            </div>
          ) : offers.length > 0 ? (
            offers.map((offer) => (
              <OfferChatCard
                key={offer.id}
                offer={offer}
                onChat={handleOpenChat}
              />
            ))
          ) : (
            <div className="col-span-4 text-center text-neutral-500">
              No offers available.
            </div>
          )}
        </div>
      )}
      <ChatDrawer
        open={chatDrawer.open}
        onOpenChange={handleCloseChat}
        offer={chatDrawer.offer}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
