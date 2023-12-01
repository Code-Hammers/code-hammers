interface ISocial {
  linkedIn?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}

interface IJob {
  title?: string;
  company?: string;
  description?: string;
  date?: Date;
}

export interface IProfile {
  user: string;
  firstName: string;
  lastName: string;
  bio?: string;
  job?: IJob;
  socials?: ISocial;
}
