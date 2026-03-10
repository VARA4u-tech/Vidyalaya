import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  Plus,
  UserPlus,
  BookOpen,
  Send,
} from "lucide-react";

const groups = [
  {
    id: 1,
    name: "Physics Ninjas",
    members: 8,
    subject: "Physics",
    color: "hsl(9,70%,54%)",
    lastMsg: "Anyone solved problem 4.7?",
    time: "2m ago",
  },
  {
    id: 2,
    name: "Math Masters",
    members: 12,
    subject: "Mathematics",
    color: "hsl(185,48%,50%)",
    lastMsg: "Chapter 9 summary is up!",
    time: "15m ago",
  },
  {
    id: 3,
    name: "Bio Crew",
    members: 5,
    subject: "Biology",
    color: "hsl(142,60%,50%)",
    lastMsg: "Quiz tomorrow — let's prep!",
    time: "1h ago",
  },
];

const messages = [
  {
    id: 1,
    user: "Aarav",
    text: "Hey everyone, did anyone solve problem 4.7?",
    time: "10:05 AM",
    me: false,
  },
  {
    id: 2,
    user: "Priya",
    text: "Yeah! Use energy conservation. Kinetic energy converts to potential.",
    time: "10:06 AM",
    me: false,
  },
  {
    id: 3,
    user: "You",
    text: "Oh that makes sense! Let me try it.",
    time: "10:08 AM",
    me: true,
  },
  {
    id: 4,
    user: "Aarav",
    text: "Got it! Thanks Priya 🎉",
    time: "10:10 AM",
    me: false,
  },
];

const StudyGroupsPage = () => {
  const [activeGroup, setActiveGroup] = useState(groups[0]);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(messages);

  const send = () => {
    if (!msg.trim()) return;
    setChat((c) => [
      ...c,
      { id: Date.now(), user: "You", text: msg, time: "Just now", me: true },
    ]);
    setMsg("");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 md:mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
            Study Groups
          </h1>
          <p className="text-[hsl(36,15%,58%)] text-sm">
            Collaborate with classmates and share knowledge.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white"
          style={{ backgroundColor: "hsl(9,70%,54%)" }}
        >
          <Plus size={15} /> Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[520px]">
        {/* Group List */}
        <div className="flex flex-col gap-2 overflow-y-auto">
          {groups.map((g) => (
            <motion.button
              key={g.id}
              onClick={() => setActiveGroup(g)}
              whileHover={{ x: 3 }}
              className={`w-full text-left rounded-2xl p-4 border transition-all ${activeGroup.id === g.id ? "border-[hsla(36,25%,90%,0.2)] bg-[hsla(210,50%,28%,0.7)]" : "border-[hsla(36,25%,90%,0.07)] bg-[hsla(210,50%,24%,0.5)] hover:border-[hsla(36,25%,90%,0.14)]"}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: g.color + "25" }}
                >
                  <Users size={15} style={{ color: g.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[hsl(36,25%,88%)] text-sm truncate">
                    {g.name}
                  </p>
                  <p className="text-[10px] text-[hsl(36,15%,50%)]">
                    {g.members} members · {g.subject}
                  </p>
                </div>
                <span className="text-[10px] text-[hsl(36,15%,42%)] flex-shrink-0">
                  {g.time}
                </span>
              </div>
              <p className="text-[hsl(36,15%,50%)] text-xs truncate">
                {g.lastMsg}
              </p>
            </motion.button>
          ))}
          <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-dashed border-[hsla(36,25%,90%,0.12)] text-[hsl(36,15%,50%)] hover:text-white hover:border-[hsla(36,25%,90%,0.3)] text-sm transition-all">
            <UserPlus size={15} /> Join a Group
          </button>
        </div>

        {/* Chat Panel */}
        <div
          className="md:col-span-2 rounded-2xl border border-[hsla(36,25%,90%,0.08)] flex flex-col overflow-hidden"
          style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-[hsla(36,25%,90%,0.07)]">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: activeGroup.color + "25" }}
            >
              <Users size={14} style={{ color: activeGroup.color }} />
            </div>
            <div>
              <p className="font-semibold text-[hsl(36,25%,88%)] text-sm">
                {activeGroup.name}
              </p>
              <p className="text-[10px] text-[hsl(36,15%,48%)]">
                {activeGroup.members} members
              </p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="p-2 rounded-xl text-[hsl(36,15%,50%)] hover:text-white bg-[hsla(36,25%,90%,0.05)] transition-all">
                <BookOpen size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {chat.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.me ? "flex-row-reverse" : ""}`}
              >
                {!m.me && (
                  <div className="w-7 h-7 rounded-full bg-[hsla(36,25%,90%,0.12)] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[hsl(36,25%,70%)]">
                    {m.user[0]}
                  </div>
                )}
                <div
                  className={`max-w-xs ${m.me ? "items-end" : "items-start"} flex flex-col gap-1`}
                >
                  {!m.me && (
                    <p className="text-[10px] text-[hsl(36,15%,50%)] px-1">
                      {m.user}
                    </p>
                  )}
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${m.me ? "text-white" : "text-[hsl(36,20%,75%)] bg-[hsla(36,25%,90%,0.07)]"}`}
                    style={m.me ? { backgroundColor: activeGroup.color } : {}}
                  >
                    {m.text}
                  </div>
                  <p className="text-[10px] text-[hsl(36,15%,40%)] px-1">
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-[hsla(36,25%,90%,0.07)] flex gap-2">
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,40%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
            />
            <button
              onClick={send}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{ backgroundColor: activeGroup.color }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyGroupsPage;
