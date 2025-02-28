import { FileError } from './types';

export const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const validateFile = (file: File): FileError | null => {
  const errors: FileError = {};

  // Check file size
  if (file.size > FILE_SIZE_LIMIT) {
    errors.size = `File size must be less than ${FILE_SIZE_LIMIT / 1024 / 1024}MB`;
  }

  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    errors.type = 'File must be a PDF, DOC, or DOCX';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};
