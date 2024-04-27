export interface Alum {
  _id: string;
  name: string;
  company: string;
  email: string;
  linkedIn?: string;
  campus?: string;
  cohort: string | number;
  jobTitle?: string;
  industry?: string;
  cities: string[];
}
