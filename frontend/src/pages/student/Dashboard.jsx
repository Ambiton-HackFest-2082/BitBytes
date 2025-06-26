import { useState } from 'react';
import { FilePlus2, HandCoins, CheckCircle2, StickyNote, User2 } from 'lucide-react';

const mockStats = {
  requestsCreated: 5,
  offersReceived: 8,
  offersAccepted: 2,
};

const mockRequests = [
  { id: 1, title: 'Learn React Basics', status: 'Open', offers: 2, createdAt: '2024-06-01' },
  { id: 2, title: 'Math Tutoring', status: 'Offer Accepted', offers: 3, createdAt: '2024-05-28' },
  { id: 3, title: 'Physics Doubts', status: 'Open', offers: 1, createdAt: '2024-05-25' },
];

const mockOffers = [
  { id: 1, requestTitle: 'Learn React Basics', teacher: 'Mr. Sharma', fee: 500, status: 'Pending', receivedAt: '2024-06-02' },
  { id: 2, requestTitle: 'Math Tutoring', teacher: 'Ms. Gupta', fee: 700, status: 'Accepted', receivedAt: '2024-05-29' },
];

const statCards = [
  {
    label: 'Requests Created',
    value: mockStats.requestsCreated,
    icon: <FilePlus2 className="text-green-500" size={28} />, // green for icon only
  },
  {
    label: 'Offers Received',
    value: mockStats.offersReceived,
    icon: <HandCoins className="text-green-500" size={28} />, // green for icon only
  },
  {
    label: 'Offers Accepted',
    value: mockStats.offersAccepted,
    icon: <CheckCircle2 className="text-green-400" size={28} />, // green for icon only
  },
];

const StudentDashboard = () => {
  const [requests] = useState(mockRequests);
  const [offers] = useState(mockOffers);

  return (
    <div className="min-h-[90vh] w-full font-sans">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 mb-1 tracking-tight">Welcome back 👋</h1>
        <p className="text-neutral-500 text-base md:text-lg">Your SkillBridge dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="group flex flex-col items-center justify-center rounded-xl shadow bg-white p-6 border border-neutral-100 hover:shadow-md transition"
          >
            <div className="mb-2">{card.icon}</div>
            <span className="text-3xl font-extrabold text-green-600 group-hover:text-green-500 transition-colors">{card.value}</span>
            <span className="text-neutral-600 font-medium text-base mt-1">{card.label}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-neutral-200" />
        <span className="text-neutral-400 text-xs uppercase tracking-widest">Overview</span>
        <div className="flex-1 h-px bg-neutral-200" />
      </div>

      {/* Latest Requests */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <StickyNote className="text-green-500" size={20} />
          <h2 className="text-lg font-semibold text-neutral-800">Latest Requests</h2>
        </div>
        {requests.length === 0 ? (
          <div className="text-neutral-400">No requests found.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white border border-neutral-100 rounded-xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-800 text-base truncate max-w-[70%]">{req.title}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${req.status === 'Open' ? 'bg-green-50 text-green-600' : 'bg-green-500 text-white'}`}>{req.status}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                  <User2 size={16} className="text-green-400" /> Offers: <span className="font-bold text-green-600">{req.offers}</span>
                </div>
                <div className="text-neutral-400 text-xs mt-1">Created: {req.createdAt}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Latest Offers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <HandCoins className="text-green-500" size={20} />
          <h2 className="text-lg font-semibold text-neutral-800">Latest Offers Received</h2>
        </div>
        {offers.length === 0 ? (
          <div className="text-neutral-400">No offers received yet.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white border border-neutral-100 rounded-xl shadow-sm p-5 flex flex-col gap-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-800 text-base truncate max-w-[70%]">{offer.requestTitle}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${offer.status === 'Accepted' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-600'}`}>{offer.status}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 text-sm">
                  <User2 size={16} className="text-green-400" /> {offer.teacher} <span className="ml-2">• Fee: <span className="font-bold text-green-600">₹{offer.fee}</span></span>
                </div>
                <div className="text-neutral-400 text-xs mt-1">Received: {offer.receivedAt}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;