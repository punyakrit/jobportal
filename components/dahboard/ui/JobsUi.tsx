"use client"
import { Job } from '@/context/JobSearchContext';
import axios from 'axios';
import React, { useEffect, useState, useRef, useCallback } from 'react'
import JobComponent from './JobComponent';
import { useUser } from "@/context/user";

function JobsUi() {
    const { user, loading: userLoading } = useUser(); 
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [jobsFound, setJobsFound] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchJobs = useCallback(async (isLoadMore = false) => {
        if (!user) return;
        
        console.log('Fetching jobs:', { page, isLoadMore, user: user.id });
        
        if (isLoadMore) {
            setLoadingMore(true);
        } else {
            setLoading(true);
        }
        
        try {
            const response = await axios.get(`https://jobportal-nu-three.vercel.app/api/v1/jobs?page=${page}&limit=${limit}&user_id=${user.id}`);
            const newJobs = response.data.data;
            
            if (isLoadMore) {
                setJobs(prevJobs => [...prevJobs, ...newJobs]);
            } else {
                setJobs(newJobs);
            }
            
            setJobsFound(newJobs.length > 0);
            setHasMore(newJobs.length === limit);
            console.log('Fetched jobs:', newJobs.length, 'hasMore:', newJobs.length === limit, 'page:', page);
        } catch (error) {
            setError(error as string);
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [user, page, limit]);

    useEffect(() => {
        if (userLoading || !user) return;
        console.log('Initial fetch triggered');
        fetchJobs();
    }, [user, userLoading, fetchJobs]);

    const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        if (!target || loadingMore || !hasMore) {
            console.log('Scroll blocked:', { loadingMore, hasMore, hasTarget: !!target });
            return;
        }
        
        const { scrollTop, scrollHeight, clientHeight } = target;
        const threshold = 100;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
        
        console.log('Scroll event:', { scrollTop, scrollHeight, clientHeight, isNearBottom, page });
        
        if (isNearBottom) {
            console.log('Triggering load more, current page:', page);
            setPage(prevPage => {
                const newPage = prevPage + 1;
                console.log('Page incremented from', prevPage, 'to', newPage);
                return newPage;
            });
        }
    }, [loadingMore, hasMore, page]);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        console.log('Setting up scroll listener on:', scrollElement);
        
        if (scrollElement) {
            const handleNativeScroll = (e: Event) => {
                const target = e.target as HTMLDivElement;
                if (!target || loadingMore || !hasMore) {
                    console.log('Scroll blocked:', { loadingMore, hasMore, hasTarget: !!target });
                    return;
                }
                
                const { scrollTop, scrollHeight, clientHeight } = target;
                const threshold = 100;
                const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
                
                console.log('Scroll event:', { scrollTop, scrollHeight, clientHeight, isNearBottom, page });
                
                if (isNearBottom) {
                    console.log('Triggering load more, current page:', page);
                    setPage(prevPage => {
                        const newPage = prevPage + 1;
                        console.log('Page incremented from', prevPage, 'to', newPage);
                        return newPage;
                    });
                }
            };
            
            scrollElement.addEventListener('scroll', handleNativeScroll);
            return () => {
                console.log('Removing scroll listener');
                scrollElement.removeEventListener('scroll', handleNativeScroll);
            };
        }
    }, [loadingMore, hasMore, page]);

    useEffect(() => {
        if (page > 1 && user) {
            console.log('Page changed to:', page, 'fetching more jobs');
            fetchJobs(true);
        }
    }, [page]);

    if (userLoading) {
        return <div>Loading user...</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
  return (
    <div>
        <div className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Searched Jobs 
        </div>
        <div 
            ref={scrollRef}
            className="flex flex-col gap-4 overflow-y-scroll h-[calc(100vh-240px)]"
            onScroll={handleScroll}
        >
            {jobs.map((job) => (
                <JobComponent key={job.company_data.job_id} job={job?.company_data} />
            ))}
            {loadingMore && (
                <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
            )}
            {!hasMore && jobs.length > 0 && (
                <div className="text-center py-4 text-gray-500">
                    No more jobs to load
                </div>
            )}
        </div>
    </div>
  )
}

export default JobsUi