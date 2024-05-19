export interface IApplication {
  id: number;
  title: string;
  company: string;
  status: string;
  notes: string;
}

export interface IApplicationFormData {
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  status_id: number;
  user_id: string;
  quick_apply: boolean;
  date_applied: string;
  general_notes: string;
}

export interface IStatus {
  id: number;
  name: string;
}
