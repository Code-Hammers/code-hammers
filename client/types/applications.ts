export interface IApplication {
  id: number;
  title: string;
  company: string;
  status: string;
  general_notes: string;
  last_updated: string;
  notification_period: number;
  notifications_paused: boolean;
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
  job_id: number;
}

export interface IStatus {
  id: number;
  name: string;
}