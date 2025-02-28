'use client';

import { 
  Typography, 
  Box, 
  Chip,
  Button,
} from '@mui/material';
import Image from 'next/image';
import { type GreenhouseJob } from '@/lib/types';

type JobDetailsProps = {
  job: GreenhouseJob;
  onApplyClick: () => void;
};

export function JobDetails({ job, onApplyClick }: JobDetailsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 6, width:"100%" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Image
                src="/ParaformLogo.png"
                alt="Paraform Logo"
                width={30}
                height={30}
              />
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Paraform
              </Typography>
            </Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {job.name}
            </Typography>
            <Typography color="text.secondary">
              {job.offices?.map((office) => office.name).join(' / ')}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={onApplyClick}
            sx={{
              minWidth: "100px",
              height: "40px"
            }}
          >
            Apply
          </Button>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            About the Role
          </Typography>
          <Box sx={{ whiteSpace: 'pre-line' }}>
            {(job.notes || "Recruiting is the highest-leverage action any company can take. Hundreds of billions are spent on staffing and recruiting per year because of how difficult yet critical it is. Hiring the best candidate for any role should take days, not months, and we believe we're best positioned to solve this at scale with our AI-enabled recruiting marketplace.")
              .split('\n')
              .map((paragraph: string, index: number) => (
                <Typography 
                  key={index}
                  variant="body1" 
                  color="text.secondary"
                  sx={{ fontSize: '1rem', lineHeight: 1.7 }}
                >
                  {paragraph}
                </Typography>
              ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Salary Range
            </Typography>
            <Typography>
              {job.salary_range_min_value && job.salary_range_max_value 
                ? `$${job.salary_range_min_value} - $${job.salary_range_max_value}`
                : 'Competitive'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Equity
            </Typography>
            <Typography>
              {job.equity_range_min_value || job.equity_range_max_value 
                ? `${job.equity_range_min_value || 'N/A'} - ${job.equity_range_max_value || 'N/A'}`
                : 'N/A'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Application Deadline
            </Typography>
            <Typography>{job.application_deadline || "N/A"}</Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {job.skills?.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
  );
} 