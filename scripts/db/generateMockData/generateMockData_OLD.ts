import fs from 'fs';
import path from 'path';
import mongoose, { Model, mongo } from 'mongoose';
import User from '../../../server/models/userModel';
import Alumni from '../../../server/models/alumniModel';
import Forum from '../../../server/models/forumModel';
import GraduateInvitation from '../../../server/models/graduateInvitationModel';
import Profile from '../../../server/models/profileModel';
import Thread from '../../../server/models/threadModel';
import Post from '../../../server/models/postModel';
import { mockUsers } from './mockUsers';
import { mockAlumni } from './mockAlumni';
import { mockForums } from './mockForums';
import { mockGradInvites } from './mockGraduateInvitation';
import {
  cohorts,
  cohortNumRange,
  skillOptions,
  jobTitleOptions,
  companyOptions,
  collegeOptions,
  degreeOptions,
  fieldOfStudyOptions,
  projectOptions,
  testimonialOptions,
  bootcampOptions,
  professionalSummaryOptions,
  personBioOptions,
  threadOptions,
  postContentOptions,
} from './options';

const randomIndex = (arr: any[]): number => Math.floor(Math.random() * arr.length);

const createRandomCohort = () => {
  return `${cohorts[randomIndex(cohorts)]} ${Math.floor(Math.random() * cohortNumRange)}`;
};

const mockGraduationInvitations = mockGradInvites.map((doc) => ({
  ...doc,
  cohort: createRandomCohort(),
}));

const createRandomSkillArray = (): string[] => {
  const randomSkills: string[] = [];
  const randoNum = Math.floor(Math.random() * 20);
  if (randoNum === 0) return randomSkills;

  for (let i = 0; i < randoNum; i++) {
    const randoIndex = randomIndex(skillOptions);

    if (randomSkills.includes(skillOptions[randoIndex])) continue;
    else randomSkills.push(skillOptions[randoIndex]);
  }

  return randomSkills;
};

const createRandomPosition = (): { title: string; company: string } => {
  return {
    title: jobTitleOptions[randomIndex(jobTitleOptions)],
    company: companyOptions[randomIndex(companyOptions)],
  };
};

const createRandomDates = (): [Date, Date] => {
  const rawDate = Date.now() - Math.floor(Math.random()) * 1000 * 60 * 60 * 24 * 365 * 10;
  return [
    new Date(rawDate),
    new Date(rawDate + Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 4)),
  ];
};

const createPastPositions = () => {
  const pastPositions: { title: string; company: string; startDate: Date; endDate: Date }[] = [];
  const randoNum = Math.floor(Math.random() * 5);
  if (randoNum === 0) return pastPositions;
  for (let i = 0; i <= randoNum; i++) {
    const dates = createRandomDates();
    pastPositions.push({
      ...createRandomPosition(),
      startDate: dates[0],
      endDate: dates[1],
    });
  }
  return pastPositions;
};

const createRandomEducation = () => {
  const education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
  }[] = [];
  const num = Math.floor(Math.random() * 4) + 1;
  for (let i = 0; i < num; i++) {
    const dates = createRandomDates();
    education.push({
      institution: collegeOptions[randomIndex(collegeOptions)],
      degree: degreeOptions[randomIndex(degreeOptions)],
      fieldOfStudy: fieldOfStudyOptions[randomIndex(fieldOfStudyOptions)],
      startDate: dates[0],
      endDate: dates[1],
    });
  }
  return education;
};

const createRandomProjects = () => {
  const projects: { name: string; description: string; link: string }[] = [];
  let numProjects = Math.floor(Math.random() * 5);
  if (numProjects === 0) return projects;
  for (let i = 0; i <= numProjects; i++) {
    projects.push(projectOptions[randomIndex(projectOptions)]);
  }
  return projects;
};

const createTestimonials = () => {
  const testimonials: {
    from: String;
    relation: String;
    text: String;
  }[] = [];
  const numTestimonials = Math.floor(Math.random() * 5);
  if (numTestimonials === 0) return testimonials;
  for (let i = 0; i <= numTestimonials; i++) {
    testimonials.push(testimonialOptions[randomIndex(testimonialOptions)]);
  }
  return testimonials;
};

const generateProfile = (userDoc: any) => {
  return {
    user: userDoc._id,
    firstName: userDoc.firstName,
    lastName: userDoc.lastName,
    profilePhoto: userDoc.profilePic,
    cohort: createRandomCohort(),
    graduationYear: createRandomDates()[0].getUTCFullYear(),
    email: userDoc.email,
    linkedInProfile: `https://www.linkedin.com/in/${userDoc.firstName + '-' + userDoc.lastName + '-fake'}`,
    professionalSummary: professionalSummaryOptions[randomIndex(professionalSummaryOptions)],
    skills: createRandomSkillArray(),
    specializations: createRandomSkillArray(),
    careerInformation: {
      currentPosition: createRandomPosition(),
      pastPositions: createPastPositions(),
    },
    education: createRandomEducation(),
    projects: createRandomProjects(),
    personalBio: personBioOptions[randomIndex(personBioOptions)],
    testimonials: createTestimonials(),
    socialMediaLinks: {
      twitter:
        Math.random() > 0.5
          ? `https://x.com/${userDoc.firstName + '-' + userDoc.lastName}-fake`
          : undefined,
      blog:
        Math.random() > 0.5
          ? `https://www.${userDoc.firstName + '-' + userDoc.lastName}-fake-blog.com`
          : undefined,
      other:
        Math.random() > 0.5
          ? [`https://www.instagram.com/${userDoc.firstName + '-' + userDoc.lastName}-fake`]
          : undefined,
    },
    availabilityForNetworking: Math.random() > 0.4 ? true : false,
    bootcampExperience: bootcampOptions[randomIndex(bootcampOptions)],
  };
};

const createThreads = (
  users: mongoose.Document[],
  forums: mongoose.Document[],
  numThreads: number,
) => {
  const threads: {
    user: string;
    forum: string;
    title: string;
    content: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
  }[] = [];
  for (let i = 0; i <= numThreads; i++) {
    const dates = Math.random() > 0.6 ? createRandomDates() : [undefined, undefined];
    threads.push({
      ...threadOptions[randomIndex(threadOptions)],
      user: users[randomIndex(users)]._id as string,
      forum: forums[randomIndex(forums)]._id as string,
      createdAt: dates[0],
      updatedAt: dates[1],
    });
  }
  return threads;
};

const createPosts = (
  users: mongoose.Document[],
  threads: mongoose.Document[],
  numPosts: number,
) => {
  const posts: {
    thread: string;
    user: string;
    content: string;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;
  }[] = [];
  for (let i = 0; i <= numPosts; i++) {
    const dates = Math.random() > 0.6 ? createRandomDates() : [undefined, undefined];
    posts.push({
      thread: threads[randomIndex(threads)]._id as string,
      user: users[randomIndex(users)]._id as string,
      content: postContentOptions[randomIndex(postContentOptions)] as string,
      createdAt: dates[0],
      updatedAt: dates[1],
    });
  }
  return posts;
};

const createDocs = async (name: string, Model: typeof mongoose.Model, mockData: any) => {
  const label = name[0] + name.slice(1).toLowerCase();
  try {
    console.log(`Creating ${label}...`);
    const docs = await Model.create(mockData);
    console.log(`💥 ${label} documents created`);

    console.log(`✍️ Writing ${label} Documents to JSON...`);
    await fs.promises.writeFile(
      path.join(__dirname, `/data/MOCK_${name}.json`),
      JSON.stringify(docs),
      'utf8',
    );
    console.log(`🚀 MOCK_${name}.json written`);

    return docs;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const generateData = async () => {
  try {
    console.log('Connecting to mongo container...');
    await mongoose.connect('mongodb://ch-mongo-dev:27017/ch-testdb');
    console.log('🍃 Connected to MongoDB container');

    console.log('Clearing out DB...');
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
    console.log('DB starting fresh 🌧️');

    await createDocs('ALUMNI', Alumni, mockAlumni);
    await createDocs('GRADUATION_INVITATIONS', GraduateInvitation, mockGraduationInvitations);
    const users = (await createDocs('USERS', User, mockUsers)) as mongoose.Document[];
    const forums = (await createDocs('FORUMS', Forum, mockForums)) as mongoose.Document[];

    console.log('🛠️ Generating profiles tied to users');
    const mockProfiles = users.map((user) => generateProfile(user));
    await createDocs('PROFILES', Profile, mockProfiles);

    console.log('🛠️ Generating threads tied to user and forum');
    const mockThreads = createThreads(users, forums, 30);
    const threads = await createDocs('THREADS', Thread, mockThreads);

    console.log('🛠️ Generating posts tied to user and thread');
    const mockPosts = createPosts(users, threads, 50);
    await createDocs('POSTS', Post, mockPosts);

    console.log('🏆 Mock data seeded in DB');
    console.log('Closing connection');
    mongoose.connection.close();
  } catch (err) {
    console.log(err);
    mongoose.connection.close();
    process.exit(1);
  }

  process.exit(0);
};

generateData();
