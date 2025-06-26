import React, { useState } from "react";

import { toast } from "sonner";
import { useNavigate

 } from "react-router-dom";

// RequestCard component
function RequestCard({ request, onView }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate()
  return (
    <div
      className="relative bg-white border border-neutral-100 rounded-xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md cursor-pointer transition-shadow group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate("/request-details")}
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
      </div>
    </div>
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

export default function ExploreRequests() {
  const [requests, setRequests] = useState(initialRequests);

  // Handlers

  const handleView = () => toast.info("View feature coming soon!");

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1 tracking-tight">
            Recent Requested Topics
          </h1>
          <p className="text-neutral-500 text-base md:text-lg">
            Browse the latest learning requests from students and offer your
            guidance on topics that match your expertise. Help learners grow by
            responding with personalized support or resources.
          </p>
        </div>
      </div>
      {requests.length === 0 ? (
        <div className="text-neutral-400 text-center py-16">
          No requests found.{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.slice(0, 6).map((req) => (
            <RequestCard key={req.id} request={req} onView={handleView} />
          ))}
        </div>
      )}
    </div>
  );
}
