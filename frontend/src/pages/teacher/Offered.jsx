import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar as CalendarIcon, X } from "lucide-react";
import useMyContext from "@/hooks/useMyContext";

function OfferChatCard({ offer, onChat }) {
  return (
    <div className="bg-white border border-neutral-100 rounded-xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-neutral-800 text-base text-md truncate max-w-[70%]">
          {offer.post.topic}
        </span>
      </div>
      <div className="text-neutral-500  mb-1 truncate">
        Student:{" "}
        <span className="font-semibold text-green-700">
          {offer.offeredTo.fullName}
        </span>
      </div>
      <div className="flex flex-wrap gap-3 text-neutral-400 mb-2">
        <span>
          Fee:{" "}
          <span className="text-green-600 font-semibold">
            ₹{offer.proposed_price}
          </span>
        </span>
        <span>Time: {new Date(offer.appointmentTime).toLocaleString()}</span>
      </div>
      <Button
        className="mt-2 bg-green-600 text-white px-4 py-2 hover:bg-green-700 flex items-center gap-2 cursor-pointer"
        onClick={() => onChat(offer)}
        disabled={offer.status !== "Accepted"}
      >
        <MessageCircle size={18} /> Chat
      </Button>
    </div>
  );
}

function AppointmentModal({ open, onClose, onSend }) {
  const [link, setLink] = useState("");
  const [credential, setCredential] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!link.trim()) {
      setError("Platform link is required.");
      return;
    }
    setError("");
    onSend({ link, credential });
    setLink("");
    setCredential("");
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
          <CalendarIcon size={20} /> Send Appointment
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Platform Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              className="w-full border rounded-lg px-3 py-2 focus:border-green-400 focus:ring-green-100 outline-none"
              placeholder="https://meet.example.com/session"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password / Credential{" "}
              <span className="text-neutral-400">(optional)</span>
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:border-green-400 focus:ring-green-100 outline-none"
              placeholder="Enter password if any"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          <div className="flex gap-2 mt-2">
            <Button
              type="button"
              className="bg-neutral-200 text-neutral-700 hover:bg-neutral-300 rounded-full px-6 py-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 rounded-full px-6 py-2"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChatDrawer({
  open,
  onOpenChange,
  offer,
  onSendMessage,
  onSendAppointment,
}) {
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);
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
          {offer?.messages?.length === 0 ? (
            <div className="text-neutral-400 text-center mt-8">
              No messages yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {offer?.messages?.map((msg, idx) =>
                typeof msg === "object" && msg.type === "appointment" ? (
                  <div
                    key={idx}
                    className="max-w-[80%] px-4 py-3 rounded-xl text-sm shadow bg-green-50 border border-green-200 self-end flex flex-col gap-1"
                  >
                    <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
                      <CalendarIcon size={16} /> Appointment
                    </div>
                    <div>
                      <span className="font-medium">Link: </span>
                      <a
                        href={msg.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-green-700 break-all"
                      >
                        {msg.link}
                      </a>
                    </div>
                    {msg.credential && (
                      <div>
                        <span className="font-medium">Password: </span>
                        {msg.credential}
                      </div>
                    )}
                  </div>
                ) : (
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
        <div className="flex gap-2 mb-3">
          <Button
            type="button"
            className="bg-green-100 text-green-700 hover:bg-green-200 rounded-full px-4 py-2 text-sm font-medium"
            onClick={() => setShowModal(true)}
          >
            <CalendarIcon size={16} className="mr-1" /> Send Appointment
          </Button>
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
        <AppointmentModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSend={(data) => {
            onSendAppointment(data);
            setShowModal(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}

export default function Offered() {
  const [chatDrawer, setChatDrawer] = useState({ open: false, offer: null });
  const [offers, setOffers] = useState([]);
  const { offerDb } = useMyContext();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Accepted");

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

  const filteredOffers = offers.filter((offer) => {
    if (filter === "Accepted") return offer.status === "Accepted";
    return offer.status === "Pending" || offer.status === "Rejected";
  });

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
  const handleSendAppointment = (data) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === chatDrawer.offer.id
          ? {
              ...o,
              messages: [
                ...o.messages,
                {
                  type: "appointment",
                  link: data.link,
                  credential: data.credential,
                },
              ],
            }
          : o
      )
    );
    setChatDrawer((prev) => ({
      ...prev,
      offer: {
        ...prev.offer,
        messages: [
          ...prev.offer.messages,
          { type: "appointment", link: data.link, credential: data.credential },
        ],
      },
    }));
  };

  return (
    <div className="w-full ">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1 tracking-tight">
          Your created Offers
        </h1>
        <p className="text-neutral-500 text-base md:text-lg">
          Here is the list of offers you have created for students. You can chat
          with them for the accepted offers, send appointment links, and manage
          your offers.
        </p>
      </div>
      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full font-semibold border transition-colors text-sm ${
            filter === "Accepted"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-green-700 border-green-200 hover:bg-green-50"
          }`}
          onClick={() => setFilter("Accepted")}
        >
          Accepted
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold border transition-colors text-sm ${
            filter === "DeclinedOrPending"
              ? "bg-green-600 text-white border-green-600"
              : "bg-white text-green-700 border-green-200 hover:bg-green-50"
          }`}
          onClick={() => setFilter("DeclinedOrPending")}
        >
          Declined or Pending
        </button>
      </div>
      {filteredOffers.length === 0 ? (
        <div className="text-neutral-400 text-center py-16">
          {filter === "Accepted"
            ? "No accepted offers yet."
            : "No declined or pending offers yet."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-4 text-center text-neutral-500">
              Loading offers...
            </div>
          ) : filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
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
        onSendAppointment={handleSendAppointment}
      />
    </div>
  );
}
