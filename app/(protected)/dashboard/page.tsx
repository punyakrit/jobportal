import JobsUi from "@/components/dahboard/ui/JobsUi";
import React from "react";

async function page() {
  return (
    

    <div className="flex gap-4 p-2 h-full">
      <div className="w-1/3">
        <div className="flex w-full gap-4">
          <div className="border border-gray-200 bg-white rounded-xl p-6 w-full shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-2">Job Searched</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">25</div>
                <div className="text-green-600 text-sm">+5 from last week</div>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 bg-white rounded-xl p-6 w-full shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-600 text-sm font-medium mb-2">Job Saved</div>
                <div className="text-3xl font-bold text-gray-800 mb-1">18</div>
                <div className="text-green-600 text-sm">+3 this week</div>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 bg-white rounded-xl p-6 mt-4 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-gray-600 text-sm font-medium mb-2">Job Applied</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">12</div>
              <div className="text-green-600 text-sm">+2 from last month</div>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3">
        <div className="border border-gray-200 bg-white h-full rounded-xl p-6 shadow-sm">
          <JobsUi />
        </div>
      </div>
    </div>
  );
}

export default page;
