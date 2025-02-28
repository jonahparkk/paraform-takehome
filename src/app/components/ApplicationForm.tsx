import { Box, TextField, Button, Stack, Typography, Alert, Snackbar } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { phoneRegex } from '@/app/components/apply-form.schema';
import { DocumentUpload } from './DocumentUpload';
import { FormUpload } from './FormUpload';
import { useState, forwardRef, useEffect } from 'react';
import { FileState, FileError, FormData } from '@/lib/types';
import { submitCandidateApplication } from '@/lib/greenhouse';

export const ApplicationForm = forwardRef<HTMLDivElement>(function ApplicationForm(_, ref) {
  const [files, setFiles] = useState<{
    resume: FileState;
    coverLetter: FileState;
  }>({
    resume: { file: null, error: null },
    coverLetter: { file: null, error: null }
  });
  
  const [openAlert, setOpenAlert] = useState(false);

  const { control, handleSubmit, formState: { errors }, setValue, register, reset } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: ''
    }
  });

  // Register resume field with validation
  useEffect(() => {
    register('resume', { 
      required: 'Resume is required' 
    });
  }, [register]);

  const handleFileChange = (type: 'resume' | 'coverLetter') => (file: File | null, error: FileError | null) => {
    setFiles(prev => ({
      ...prev,
      [type]: { file, error }
    }));
    setValue(type, file as File, { 
      shouldValidate: true
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
        const jobId = 4285367007;
        const response = await submitCandidateApplication(jobId, data);
        if (response.success) {
          reset();
          setFiles({
            resume: { file: null, error: null },
            coverLetter: { file: null, error: null }
          });
          setOpenAlert(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error submitting application:', error);
    }
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <Box 
      ref={ref} 
      component="form"
      onSubmit={handleSubmit(onSubmit)} 
      noValidate 
      sx={{ maxWidth: 'md', mx: 'auto', py: '8px', display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Snackbar 
        open={openAlert} 
        autoHideDuration={6000} 
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Application submitted successfully!
        </Alert>
      </Snackbar>
      
      <Typography variant="h6" gutterBottom>Apply for this role</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name="firstName"
          control={control}
          rules={{
            required: 'First name is required',
            pattern: {
              value: /^[A-Za-z\s-]{2,}$/,
              message: 'Please enter a valid first name'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
              variant="outlined"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: 'Last name is required',
            pattern: {
              value: /^[A-Za-z\s-]{2,}$/,
              message: 'Please enter a valid last name'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              required
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.type === 'too_small' ? '' : errors.lastName?.message}
              fullWidth
              variant="outlined"
            />
          )}
        />
      </Stack>

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.type === 'too_small' ? '' : errors.email?.message}
            fullWidth
            variant="outlined"
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          pattern: {
            value: phoneRegex,
            message: 'Please enter a valid phone number'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone Number"
            type="tel"
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, '');
              
              // Format the phone number
              if (value.length > 0) {
                if (value.length <= 3) {
                  value = `(${value}`;
                } else if (value.length <= 6) {
                  value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                  value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
              }
              
              field.onChange(value);
            }}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            fullWidth
            variant="outlined"
            placeholder="(555) 555-5555"
          />
        )}
      />

      <Controller
        name="linkedin"
        control={control}
        rules={{
          required: 'LinkedIn URL is required',
          pattern: {
            value: /^(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+\/?$/,
            message: 'Please enter a valid LinkedIn profile URL'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            required
            label="LinkedIn URL"
            type="url"
            placeholder="linkedin.com/in/username"
            error={!!errors.linkedin}
            helperText={errors.linkedin?.message}
            fullWidth
            variant="outlined"
          />
        )}
      />

      <Controller
        name="portfolio"
        control={control}
        rules={{
          pattern: {
            value: /^https?:\/\/.+\..+/,
            message: 'Please enter a valid URL'
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Portfolio URL (Optional)"
            type="url"
            placeholder="https://your-portfolio.com"
            error={!!errors.portfolio}
            helperText={errors.portfolio?.type === 'too_small' ? '' : errors.portfolio?.message}
            fullWidth
            variant="outlined"
          />
        )}
      />

      <DocumentUpload
        renderFileUpload={(type, label, required) => (
          <FormUpload
            label={label}
            required={required}
            onChange={handleFileChange(type)}
            error={files[type].error || (errors[type] ? { type: errors[type]?.message } : null)}
            file={files[type].file}
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Box>
  );
});
