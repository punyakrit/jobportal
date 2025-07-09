import React, { useState, useEffect } from "react";

function HeroPage() {
  const [currentNotification, setCurrentNotification] = useState({
    name: "Jennifer",
    action: "just got hired!",
    time: "2 minutes ago"
  });

  const [currentProfile, setCurrentProfile] = useState({
    name: "Sarah Mitchell",
    role: "UX Designer",
    initials: "SM",
    bgColor: "from-blue-500 to-purple-600"
  });

  const [currentStats, setCurrentStats] = useState({
    number: "1,247",
    label: "Active Jobs",
    growth: "+23% this week"
  });

  const notifications = [
    { name: "Jennifer", action: "just got hired!", time: "2 minutes ago" },
    { name: "Michael", action: "landed a remote job!", time: "5 minutes ago" },
    { name: "Sarah", action: "got matched!", time: "3 minutes ago" },
    { name: "David", action: "started a new position!", time: "1 minute ago" },
    { name: "Emma", action: "found her dream job!", time: "4 minutes ago" },
    { name: "Alex", action: "just got hired!", time: "6 minutes ago" }
  ];

  const profiles = [
    { name: "Sarah Mitchell", role: "UX Designer", initials: "SM", bgColor: "from-blue-500 to-purple-600" },
    { name: "John Carter", role: "Product Manager", initials: "JC", bgColor: "from-green-500 to-teal-600" },
    { name: "Emily Davis", role: "Frontend Developer", initials: "ED", bgColor: "from-purple-500 to-pink-600" },
    { name: "Mark Wilson", role: "Data Scientist", initials: "MW", bgColor: "from-orange-500 to-red-600" },
    { name: "Lisa Chen", role: "Marketing Manager", initials: "LC", bgColor: "from-indigo-500 to-blue-600" },
    { name: "Tom Anderson", role: "Backend Developer", initials: "TA", bgColor: "from-gray-600 to-gray-800" }
  ];

  const stats = [
    { number: "1,247", label: "Active Jobs", growth: "+23% this week" },
    { number: "2,384", label: "Remote Jobs", growth: "+18% this week" },
    { number: "892", label: "New Postings", growth: "+31% this week" },
    { number: "3,156", label: "Open Positions", growth: "+15% this week" },
    { number: "1,678", label: "Companies Hiring", growth: "+27% this week" },
    { number: "945", label: "Fresh Opportunities", growth: "+42% this week" }
  ];

  useEffect(() => {
    const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
    const randomProfile = profiles[Math.floor(Math.random() * profiles.length)];
    const randomStats = stats[Math.floor(Math.random() * stats.length)];
    
    setCurrentNotification(randomNotification);
    setCurrentProfile(randomProfile);
    setCurrentStats(randomStats);
  }, []);

  return (
    <section className="container max-w-7xl mx-auto mt-1 lg:mt-6 py-24 px-4 relative overflow-hidden">
      
      <div className="absolute top-8 left-16 animate-pulse hidden lg:block">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 max-w-xs">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentProfile.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
              {currentProfile.initials}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{currentProfile.name}</div>
              <div className="text-sm text-gray-500">{currentProfile.role}</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Remote</span>
            <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Full Time</span>
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-16 animate-fade-in hidden lg:block">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-sm font-medium text-gray-900">
              {currentNotification.name} {currentNotification.action}
            </span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{currentNotification.time}</div>
        </div>
      </div>

      <div className="absolute bottom-16 left-20 animate-gentle-bounce hidden lg:block">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">📊</div>
            <div>
              <div className="font-bold text-gray-900">{currentStats.number}</div>
              <div className="text-sm text-gray-500">{currentStats.label}</div>
            </div>
          </div>
          <div className="text-xs text-green-600 mt-1">{currentStats.growth}</div>
        </div>
      </div>

      <div className="absolute top-2/3 right-12 animate-float hidden lg:block">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              AJ
            </div>
            <div>
              <div className="font-semibold text-gray-900">Alex Johnson</div>
              <div className="text-sm text-gray-500">Full Stack Developer</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Contract</span>
            <span className="ml-2 text-green-600 font-medium">$75/hr</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce hidden lg:block">
        <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ✓
            </div>
            <span className="text-sm font-medium text-gray-900">New match found!</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-6xl md:text-7xl lg:text-8xl  font-bold text-center ">
          Discover <span className="text-green-500 italic">Remote Jobs</span> That
          Match Your Lifestyle
        </div>
        <div className="text-center text-neutral-500 mt-8 text-lg md:text-xl max-w-3xl mx-auto">
          Join thousands of professionals using our platform to find flexible,
          remote-friendly jobs tailored to their skills, goals, and schedules.
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-gentle-bounce {
          animation: gentle-bounce 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}

export default HeroPage;
