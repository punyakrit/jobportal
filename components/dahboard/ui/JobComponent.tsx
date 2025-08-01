"use client";
import { Button } from "@/components/ui/button";
import { Job } from "@/context/JobSearchContext";
import { Building2, Clock, ExternalLink, MapPin, Users } from "lucide-react";
import React from "react";

function JobComponent({ job }: { job: Job }) {
  return (
    <div
      key={job.job_id}
      className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 hover:border-green-300"
    >
      <div className="flex items-start gap-4">
        {job.company_logo_url && (
          <img
            src={job.company_logo_url}
            alt={job.company_name}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-800 hover:text-green-600 cursor-pointer mb-1">
                <a
                  href={job.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {job.job_title}
                </a>
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{job.company_name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{job.time_posted}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{job.num_applicants}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {job.salary_range && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {job.salary_range}
                  </span>
                )}
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {job.employment_type}
                </span>
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  {job.seniority_level}
                </span>
                {job.easy_apply && (
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    Easy Apply
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {job?.job_description?.substring(0, 200)}...
              </p>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Button
                onClick={() => window.open(job.apply_url, "_blank")}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Apply
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Save Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobComponent;
