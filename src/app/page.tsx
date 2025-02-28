'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Container,
} from '@mui/material';
import { getJob } from '@/lib/greenhouse';
import { type GreenhouseJob } from '@/lib/types';
import { notFound } from 'next/navigation';
import { JobDetails } from './components/JobDetails';
import { ApplicationForm } from './components/ApplicationForm';



export default function Home() {

  const [job, setJob] = useState<GreenhouseJob | null>(null);
  const jobId = 4285367007;
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobData = await getJob(jobId);
        setJob(jobData);
      } catch (error) {
        console.error('Failed to fetch job:', error);
        notFound();
      }
    };
    fetchJob();
  }, []);

  if (!job) return null;

  const handleApplyClick = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 0);
  };


  return (
    <Container sx={{ py: 6, width: '60%' }}>
      <JobDetails job={job} onApplyClick={handleApplyClick} />

      <ApplicationForm ref={formRef}/>
    </Container>
  );
}
