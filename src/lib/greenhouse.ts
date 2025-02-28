import { GreenhouseResponse, GreenhouseJob,CandidateData, FormData } from './types';
const API_KEY = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;

if (!API_KEY) {
  throw new Error('Greenhouse API key not configured');
}

const headers = {
    'Authorization': `Basic ${Buffer.from(API_KEY + ':').toString('base64')}`,
    'Content-Type': 'application/json'
};


// For client-side job fetching
function buildGreenhouseJob(response: GreenhouseResponse): GreenhouseJob {
  const salaryRange = response.keyed_custom_fields?.salary_range?.value;
  
  return {
    id: response.id,
    name: response.name,
    offices: response.offices?.map((office) => ({
      id: office.id,
      name: office.name,
      location: office.location
    })),
    location: response.location,
    notes: response.notes,
    salary_range_min_value: salaryRange ? parseFloat(salaryRange.min_value) : undefined,
    salary_range_max_value: salaryRange ? parseFloat(salaryRange.max_value) : undefined,
    equity_range_min_value: undefined,
    equity_range_max_value: undefined,
    skills: ["React", "Typescript", "Next.js", "Python", "PostgreSQL"], 
    application_deadline: undefined
  };
}

export async function getJob(id: string | number) {
  const response = await fetch(`/api/greenhouse?id=${id}`, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch job: ${response.statusText}`);
  }

  const data: GreenhouseResponse = await response.json();
  return buildGreenhouseJob(data);
}

export async function submitCandidateApplication(
  jobId: string | number,
  data: FormData
) {
    const candidateData: CandidateData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email_addresses: [{value: data.email, type: 'work'}],
        phone_numbers: data.phone ? [{value: data.phone, type: 'work'}] : [],
        social_media_addresses: [{value: data.linkedin}],
        website_addresses: data.portfolio ? [{value: data.portfolio, type: 'portfolio'}] : [],
        applications: [{job_id: jobId, attachments: []}],
        
    };

    // Add resume
    if (data.resume) {
        const resumeBuffer = await data.resume.arrayBuffer();
        const base64Content = Buffer.from(resumeBuffer).toString('base64');
        candidateData.applications[0].attachments.push({
            filename: data.resume.name,
            type: 'resume',
            content: base64Content,
            content_type: data.resume.type
        });
    }

    // Add cover letter if it exists
    if (data.coverLetter) {
        const coverLetterBuffer = await data.coverLetter.arrayBuffer();
        const base64Content = Buffer.from(coverLetterBuffer).toString('base64');
        candidateData.applications[0].attachments.push({
            filename: data.coverLetter.name,
            type: 'cover_letter',
            content: base64Content,
            content_type: data.coverLetter.type
        });
    }

    const response = await fetch('/api/candidates', {
        method: 'POST',
        headers,
        body: JSON.stringify(candidateData)
    });

    if (!response.ok) {
        throw new Error(`Failed to submit application: ${response.statusText}`);
    }

    return { success: true };
}
