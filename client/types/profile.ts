import { Document, ObjectId } from 'mongoose';

interface ISocialLinks {
  twitter?: string;
  blog?: string;
  other?: string[];
}

interface IProject {
  name: string;
  description?: string;
  link?: string;
}

interface ICareerPosition {
  title?: string;
  company?: string;
  startDate?: Date;
  endDate?: Date;
}

interface IEducation {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: Date;
  endDate?: Date;
}

interface ITestimonial {
  from: string;
  relation?: string;
  text: string;
}

interface IBlogOrWriting {
  title: string;
  link: string;
}

export interface IProfile extends Document {
  user: ObjectId;
  firstName: string;
  lastName: string;
  nickName: string;
  profilePhoto?: string;
  cohort?: string;
  graduationYear?: number;
  email?: string;
  linkedInProfile?: string;
  gitHubProfile?: string; 
  professionalSummary?: string;
  skills?: string[];
  specializations?: string[];
  careerInformation?: {
    currentPosition?: {
      title?: string;
      company?: string;
    };
    pastPositions?: ICareerPosition[];
  };
  education?: IEducation[];
  projects?: IProject[];
  personalBio?: string;
  testimonials?: ITestimonial[];
  socialMediaLinks?: ISocialLinks;
  availabilityForNetworking?: boolean;
  bootcampExperience?: string;
  achievementsAndCertifications?: string[];
  volunteerWork?: string[];
  eventParticipation?: string[];
  gallery?: string[];
  blogOrWriting?: IBlogOrWriting[];
}
