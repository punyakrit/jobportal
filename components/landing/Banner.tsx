import React from "react";

function Banner() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm">
      <div className="md:text-lg text-sm font-medium text-center py-3 px-4">
        Sign up and get <span className="font-bold text-yellow-300 bg-white/10 px-2 py-1 rounded">50 free credits</span> to start your remote job search
      </div>
    </section>
  );
}

export default Banner;
