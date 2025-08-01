'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Job {
  company_data: Job
  job_id: string
  job_url: string
  job_title: string
  company_name: string
  company_url: string
  location: string
  time_posted: string
  num_applicants: string
  salary_range: string | null
  job_description: string
  job_description_raw_html: string
  company_logo_url: string
  seniority_level: string
  employment_type: string
  job_function: string
  industries: string
  easy_apply: boolean
  apply_url: string
}

export interface JobSearchFilters {
  userId: string
  experience_level: string
  job_post_time: string
  job_title: string
  job_type: string
  jobs_entries: number
  location: string
  work_schedule: string
}

interface JobSearchContextType {
  filters: JobSearchFilters | null
  jobs: Job[]
  loading: boolean
  error: string | null
  jobsFound: boolean
  updateFilters: (newFilters: Partial<JobSearchFilters>) => void
  searchJobs: () => Promise<void>
  clearFilters: () => void
}

const JobSearchContext = createContext<JobSearchContextType | undefined>(undefined)

export const useJobSearch = () => {
  const context = useContext(JobSearchContext)
  if (!context) {
    throw new Error('useJobSearch must be used within a JobSearchProvider')
  }
  return context
}

export const JobSearchProvider: React.FC<{ children: ReactNode, userId: string }> = ({ children, userId }) => {
  const [filters, setFilters] = useState<JobSearchFilters>({
    userId,
    experience_level: "",
    job_post_time: "",
    job_title: "",
    job_type: "",
    jobs_entries: 10,
    location: "",
    work_schedule: ""
  })
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jobsFound, setJobsFound] = useState(false)

  const updateFilters = (newFilters: Partial<JobSearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const searchJobs = async () => {
    if (!filters) return

    setLoading(true)
    setError(null)
    setJobsFound(false)

    try {
      const apiFilters = {
        ...filters,
        job_post_time: filters.job_post_time === 'any' ? '' : filters.job_post_time
      }

      const response = await fetch('https://jobportal-nu-three.vercel.app/api/v1/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiFilters),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }

      const data = await response.json()
      const jobsData = data.data || []
      setJobs(jobsData)
      
      if (jobsData.length > 0) {
        setJobsFound(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching jobs:', err)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setFilters({
      ...filters,
      experience_level: "",
      job_post_time: "",
      job_title: "",
      job_type: "",
      jobs_entries: 10,
      location: "",
      work_schedule: ""
    })
    setJobs([])
    setError(null)
    setJobsFound(false)
  }

  return (
    <JobSearchContext.Provider
      value={{
        filters,
        jobs,
        loading,
        error,
        jobsFound,
        updateFilters,
        searchJobs,
        clearFilters,
      }}
    >
      {children}
    </JobSearchContext.Provider>
  )
} 