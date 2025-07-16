'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Search, MapPin, Filter, Clock, Users, Building2, ExternalLink } from 'lucide-react'
import { useJobSearch } from '@/context/JobSearchContext'
import JobComponent from '@/components/dahboard/ui/JobComponent'

function page() {
  const { filters, jobs, loading, error, updateFilters, searchJobs, clearFilters } = useJobSearch()

  const handleInputChange = (field: string, value: string | number) => {
    updateFilters({ [field]: value })
  }

  const handleSearch = () => {
    searchJobs()
  }

  const handleClear = () => {
    clearFilters()
  }

  if (!filters) {
    return (
      <div className='grid grid-cols-12 gap-6 h-full p-2'>
        <div className='col-span-4 overflow-y-hidden'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit'>
            <div className='flex items-center justify-center h-32'>
              <div className='text-gray-500'>Loading...</div>
            </div>
          </div>
        </div>
        <div className='col-span-8 overflow-y-scroll'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full'>
            <div className='flex items-center justify-center h-32'>
              <div className='text-gray-500'>Loading...</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-12 gap-6 h-full p-2'>
      <div className='col-span-4 overflow-y-scroll'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit'>
          <div className='flex items-center gap-3 mb-6'>
            <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
              <Filter className='w-5 h-5 text-green-600' />
            </div>
            <h2 className='text-xl font-semibold text-gray-800'>Search Jobs</h2>
          </div>
          
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor="job_title" className='text-sm font-medium text-gray-700'>Job Title</Label>
              <div className='relative'>
                <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  id="job_title"
                  type="text"
                  placeholder="e.g. Software Engineer, Designer"
                  value={filters.job_title}
                  onChange={(e) => handleInputChange('job_title', e.target.value)}
                  className='pl-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="location" className='text-sm font-medium text-gray-700'>Location</Label>
              <div className='relative'>
                <MapPin className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                <Input
                  id="location"
                  type="text"
                  placeholder="e.g. New York, Remote"
                  value={filters.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className='pl-10 h-11 border-gray-200 focus:border-green-500 focus:ring-green-500'
                />
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="experience_level" className='text-sm font-medium text-gray-700'>Experience Level</Label>
              <Select value={filters.experience_level || undefined} onValueChange={(value) => handleInputChange('experience_level', value)}>
                <SelectTrigger className='h-11 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full'>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Intern</SelectItem>
                  <SelectItem value="2">Assistant</SelectItem>
                  <SelectItem value="3">Junior</SelectItem>
                  <SelectItem value="4">Mid-Senior</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="job_type" className='text-sm font-medium text-gray-700'>Job Type</Label>
              <Select value={filters.job_type || undefined} onValueChange={(value) => handleInputChange('job_type', value)}>
                <SelectTrigger className='h-11 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full'>
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="F">Full-time</SelectItem>
                  <SelectItem value="P">Part-time</SelectItem>
                  <SelectItem value="C">Contract</SelectItem>
                  <SelectItem value="T">Temporary</SelectItem>
                  <SelectItem value="I">Internship</SelectItem>
                  <SelectItem value="O">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="work_schedule" className='text-sm font-medium text-gray-700'>Work Schedule</Label>
              <Select value={filters.work_schedule || undefined} onValueChange={(value) => handleInputChange('work_schedule', value)}>
                <SelectTrigger className='h-11 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full'>
                  <SelectValue placeholder="Select work schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">On-site</SelectItem>
                  <SelectItem value="2">Remote</SelectItem>
                  <SelectItem value="3">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="posted_time" className='text-sm font-medium text-gray-700'>Posted Time</Label>
              <Select value={filters.job_post_time || undefined} onValueChange={(value) => handleInputChange('job_post_time', value)}>
                <SelectTrigger className='h-11 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full'>
                  <SelectValue placeholder="Select posted time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any time</SelectItem>
                  <SelectItem value="r86400">Past 24 hours</SelectItem>
                  <SelectItem value="r604800">Past 7 days</SelectItem>
                  <SelectItem value="r2592000">Past 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor="jobs_entries" className='text-sm font-medium text-gray-700'>Number of Jobs</Label>
              <Select value={filters.jobs_entries.toString()} onValueChange={(value) => handleInputChange('jobs_entries', parseInt(value))}>
                <SelectTrigger className='h-11 border-gray-200 focus:border-green-500 focus:ring-green-500 w-full'>
                  <SelectValue placeholder="Select number of jobs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 jobs</SelectItem>
                  <SelectItem value="20">20 jobs</SelectItem>
                  <SelectItem value="50">50 jobs</SelectItem>
                  <SelectItem value="100">100 jobs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='pt-4 space-y-3'>
              <Button 
                onClick={handleSearch}
                disabled={loading}
                className='w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium'
              >
                <Search className='w-4 h-4 mr-2' />
                {loading ? 'Searching...' : 'Search Jobs'}
              </Button>
              <Button 
                onClick={handleClear}
                variant="outline" 
                className='w-full h-11 border-gray-200 text-gray-600 hover:bg-gray-50'
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-8 overflow-y-scroll'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-xl font-semibold text-gray-800'>Job Results</h3>
              <p className='text-sm text-gray-500'>
                {jobs.length > 0 ? `Showing ${jobs.length} job${jobs.length > 1 ? 's' : ''}` : 'No jobs found'}
              </p>
            </div>
          </div>

          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
              <p className='text-red-600'>{error}</p>
            </div>
          )}

          {loading ? (
            <div className='flex items-center justify-center h-64'>
              <div className='text-gray-500'>Loading jobs...</div>
            </div>
          ) : jobs.length > 0 ? (
            <div className='space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto'>
              {jobs.map((job) => (
                <JobComponent key={job.job_id} job={job} />
              ))}
            </div>
          ) : !loading && (
            <div className='flex items-center justify-center h-64'>
              <div className='text-center'>
                <div className='text-gray-500 mb-2'>No jobs found</div>
                <p className='text-sm text-gray-400'>Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default page