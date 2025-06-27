import React, { useEffect, useRef, useState } from "react";
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

function AppointmentBox({ url, time, onConfirm, onReject }) {
  return (
    <div className="mb-4 p-4 rounded-xl border border-green-200 bg-green-50 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-green-700 font-semibold mb-1">
        <CalendarIcon size={16} /> Appointment
      </div>
      <p className="text-sm text-neutral-600">
        Appointment has been scheduled at the time :{" "}
        {new Date(time).toLocaleString()}
      </p>
      {Date.now() >= new Date(time) && (
        <div className="flex gap-2 mt-2">
          <a
            className="bg-green-600 text-center flex-1 text-white hover:bg-green-700 rounded-full px-5 py-2 "
            onClick={onConfirm}
            href={url}
            target="_blank"
          >
            Join
          </a>
        </div>
      )}
    </div>
  );
}

function ChatDrawer({ open, onOpenChange, offer, onSendMessage }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { chatDb, appointmentDb } = useMyContext();
  const [appointmentMsg, setAppointmentMsg] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chats = await chatDb.fetchChats(offer?._id);
        setMessages(chats);
        // console.log(offer)
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };
    fetchChats();
  }, [open, onOpenChange]);

  useEffect(() => {
    const fetchAppoinemt = async () => {
      try {
        const res = await appointmentDb.fetchAppoinment(offer?._id);
        setAppointmentMsg(res);
        // console.log(offer)
      } catch (error) {
        console.error("Failed to fetch appointment:", error);
      }
    };
    fetchAppoinemt();
  }, [open, onOpenChange]);

  const createMsg = async () => {
    try {
      const res = await chatDb.createChat(
        offer.offeredTo._id,
        offer._id,
        input
      );

      setMessages((prev) => [...prev, res]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await createMsg();
    setInput("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="max-w-md w-full flex flex-col">
        <SheetHeader>
          <SheetTitle>Chat with {offer?.offeredBy.fullName}</SheetTitle>
          <div className="text-xs text-neutral-400 mt-1">
            For request:{" "}
            <span className="font-semibold">{offer?.post.topic}</span>
          </div>
        </SheetHeader>
        {appointmentMsg && (
          <AppointmentBox
            url={appointmentMsg?.zoomLink}
            time={appointmentMsg?.scheduleTime}
            status={""}
            onConfirm={() => {}}
            onReject={() => {}}
          />
        )}
        <div className="flex-1 overflow-y-auto my-4 px-1">
          {/* Appointment box if present */}
          {messages?.length === 0 ? (
            <div className="text-neutral-400 text-center mt-8">
              No messages yet.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {messages?.map((msg, idx) => {
                const isStudent = msg.sender.role === "student";
                return (
                  <div
                    key={idx}
                    className={`flex flex-col gap-1 max-w-[80%] ${
                      isStudent
                        ? "self-end items-end"
                        : "self-start items-start"
                    }`}
                  >
                    {/* Sender Name */}
                    <div className="text-xs font-semibold text-gray-600">
                      {msg.name}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`px-3 py-2 rounded-lg text-sm shadow-sm ${
                        isStudent
                          ? "bg-green-50 text-green-900"
                          : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {msg.message}
                    </div>

                    {/* Timestamp */}
                    <p className="text-gray-400 text-[11px]">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
          <div ref={bottomRef} />
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

      {loading ? (
        <></>
      ) : (
        offers.length > 0 && (
          <ChatDrawer
            open={chatDrawer.open}
            onOpenChange={handleCloseChat}
            offer={chatDrawer.offer}
            onSendMessage={handleSendMessage}
          />
        )
      )}
    </div>
  );
}
