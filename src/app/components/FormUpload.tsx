import { FormControl, Typography, FormHelperText, Box, ButtonBase, IconButton } from '@mui/material';
import { formatFileSize, validateFile, FILE_SIZE_LIMIT } from '@/lib/utils';
import { FileError } from '@/lib/types';
import { DragEvent, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

interface FormUploadProps {
  label: string;
  required: boolean;
  onChange: (file: File | null, error: FileError | null) => void;
  error: FileError | null;
  file: File | null;
}

export function FormUpload({ label, required, onChange, error, file }: FormUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | null) => {
    const fileError = file ? validateFile(file) : null;
    onChange(file, fileError);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleFile(null);
  };

  return (
    <FormControl error={!!error} fullWidth>
      <Typography variant="subtitle2" gutterBottom>
        {label} {required && '*'}
      </Typography>
      <Box
        component="div"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          position: 'relative',
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : error ? 'error.main' : 'grey.300',
          borderRadius: 1,
          px: 2,
          py: 4,
          textAlign: 'center',
          bgcolor: isDragging ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'action.hover'
          }
        }}
      >
        <ButtonBase
          component="label"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {file ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{file.name} ({formatFileSize(file.size)})</span>
              <IconButton 
                size="small"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove(e);
                }}
                sx={{ 
                  ml: 1,
                  '&:hover': {
                    bgcolor: 'error.main',
                    color: 'white'
                  }
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <>
              Upload {label.toLowerCase()} or drag and drop
            </>
          )}
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFile(e.target.files?.[0] || null)}
          />
        </ButtonBase>
      </Box>
      <FormHelperText error={!!error}>
        {error ? (
          <>
            {error.size && <span>{error.size}</span>}
            {error.type && <span>{error.type}</span>}
          </>
        ) : (
          `Accepted formats: PDF, DOC, DOCX (max ${FILE_SIZE_LIMIT / 1024 / 1024}MB)`
        )}
      </FormHelperText>
    </FormControl>
  );
} 