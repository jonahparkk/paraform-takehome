export interface FileState {
  file: File | null;
  error: FileError | null;
}

export interface FileError {
  type?: string;
  size?: string;
}

export interface CandidateData {
    first_name: string;
    last_name: string;
    email_addresses?: {
        value: string;
        type: string;
    }[];
    phone_numbers?: {
        value: string;
        type: string;
    }[];
    social_media_addresses: {
        value: string;
    }[];
    website_addresses: {
        value: string;
        type: string;
    }[],
    applications: {
        job_id: string | number;
        attachments: {
            filename: string;
            type: string;
            content: string;
            content_type: string;
        }[];
    }[];
}

export interface GreenhouseResponse {
    id: number;
    name: string;
    offices?: {
      id: number;
      name: string;
      location: {
        name: string | null;
      };
    }[];
    location?: { name: string | null };
    notes: string | null;
    keyed_custom_fields?: {
      salary_range?: {
        value?: {
          min_value: string;
          max_value: string;
        };
      };
    };
  }

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio?: string;
  resume: File;
  coverLetter?: File;
}

export type GreenhouseOffice = {
  id: number;
  name: string | null;
  location?: {
    name: string | null;
  };
};

export type GreenhouseJob = {
  id: number;
  name: string;
  offices?: GreenhouseOffice[];
  location?: {
    name: string | null;
  };
  notes: string | null;
  salary_range_min_value?: number;
  salary_range_max_value?: number;
  equity_range_min_value?: number;
  equity_range_max_value?: number;
  skills?: string[];
  application_deadline?: string;
}; 