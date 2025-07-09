import React from "react";

function HeroPage() {
  return (
    <section className="container max-w-4xl mx-auto mt-14 py-24 px-2">
      <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-center">
        Discover <span className="text-green-500 italic">Remote Jobs</span> That Match Your Lifestyle
      </div>
      <div className="text-center text-neutral-500 mt-8 text-lg md:text-xl max-w-2xl mx-auto">
        Join thousands of professionals using our platform to find flexible,
        remote-friendly jobs tailored to their skills, goals, and schedules.
      </div>
    </section>
  );
}

export default HeroPage;
