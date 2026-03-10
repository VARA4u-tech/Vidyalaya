import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const weeklyData = [
  { day: "Mon", hours: 2.5, score: 72 },
  { day: "Tue", hours: 1.8, score: 80 },
  { day: "Wed", hours: 3.2, score: 75 },
  { day: "Thu", hours: 2.0, score: 88 },
  { day: "Fri", hours: 4.0, score: 91 },
  { day: "Sat", hours: 1.5, score: 83 },
  { day: "Sun", hours: 2.8, score: 87 },
];

const subjectData = [
  { subject: "Physics", A: 80 },
  { subject: "Math", A: 90 },
  { subject: "Chemistry", A: 65 },
  { subject: "History", A: 75 },
  { subject: "Biology", A: 85 },
  { subject: "English", A: 70 },
];

const quizHistory = [
  { name: "Quiz 1", score: 78, date: "Feb 28" },
  { name: "Quiz 2", score: 84, date: "Mar 1" },
  { name: "Quiz 3", score: 91, date: "Mar 2" },
  { name: "Quiz 4", score: 88, date: "Mar 3" },
  { name: "Quiz 5", score: 95, date: "Mar 4" },
];

const cardStyle = { backgroundColor: "hsla(210,50%,24%,0.5)" };
const borderClass = "border border-[hsla(36,25%,90%,0.08)]";

const ProgressPage = () => (
  <div className="max-w-6xl mx-auto">
    <div className="mb-6 md:mb-8">
      <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
        Progress Dashboard
      </h1>
      <p className="text-[hsl(36,15%,58%)] text-sm">
        Track your study habits, scores, and subject mastery.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
      {/* Weekly Hours */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-2xl p-5 ${borderClass}`}
        style={cardStyle}
      >
        <p className="font-semibold text-[hsl(36,25%,80%)] mb-4 text-sm">
          Study Hours This Week
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsla(36,25%,90%,0.06)"
            />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(36,15%,55%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(36,15%,55%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(210,48%,20%)",
                border: "1px solid hsla(36,25%,90%,0.12)",
                borderRadius: "12px",
                color: "hsl(36,25%,88%)",
              }}
            />
            <Bar
              dataKey="hours"
              fill="hsl(185,48%,50%)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quiz Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`rounded-2xl p-5 ${borderClass}`}
        style={cardStyle}
      >
        <p className="font-semibold text-[hsl(36,25%,80%)] mb-4 text-sm">
          Quiz Score Trend
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={quizHistory}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsla(36,25%,90%,0.06)"
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "hsl(36,15%,55%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 100]}
              tick={{ fill: "hsl(36,15%,55%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(210,48%,20%)",
                border: "1px solid hsla(36,25%,90%,0.12)",
                borderRadius: "12px",
                color: "hsl(36,25%,88%)",
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(9,70%,54%)"
              strokeWidth={3}
              dot={{ fill: "hsl(9,70%,54%)", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {/* Subject Mastery Radar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`rounded-2xl p-5 ${borderClass}`}
        style={cardStyle}
      >
        <p className="font-semibold text-[hsl(36,25%,80%)] mb-4 text-sm">
          Subject Mastery
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={subjectData}>
            <PolarGrid stroke="hsla(36,25%,90%,0.1)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "hsl(36,15%,60%)", fontSize: 12 }}
            />
            <Radar
              dataKey="A"
              stroke="hsl(9,70%,54%)"
              fill="hsl(9,70%,54%)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Recent Quiz History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`rounded-2xl p-5 ${borderClass}`}
        style={cardStyle}
      >
        <p className="font-semibold text-[hsl(36,25%,80%)] mb-4 text-sm">
          Recent Quiz History
        </p>
        <div className="flex flex-col gap-3">
          {quizHistory.map((q, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-[hsl(36,15%,50%)] text-xs w-14">
                {q.date}
              </span>
              <div className="flex-1 h-2 rounded-full bg-[hsla(36,25%,90%,0.07)] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor:
                      q.score >= 85 ? "hsl(142,60%,50%)" : "hsl(9,70%,54%)",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${q.score}%` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.7 }}
                />
              </div>
              <span className="text-[hsl(36,25%,85%)] text-sm font-bold w-10 text-right">
                {q.score}%
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default ProgressPage;
