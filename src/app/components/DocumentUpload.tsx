import { Stack } from '@mui/material';

interface DocumentUploadProps {
  renderFileUpload: (type: 'resume' | 'coverLetter', label: string, required: boolean) => React.ReactNode;
}

export function DocumentUpload({ renderFileUpload }: DocumentUploadProps) {
  return (
    <Stack spacing={2}>
      {renderFileUpload('resume', 'Resume', true)}
      {renderFileUpload('coverLetter', 'Cover Letter', false)}
    </Stack>
  );
} 