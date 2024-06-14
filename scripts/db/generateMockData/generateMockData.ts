import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { mockUsers } from './mockUsers';
import { mockAlumni } from './mockAlumni';
import { mockForums } from './mockForums';
import { mockGradInvites } from './mockGraduateInvitation';
import { cohorts, cohortNumRange, cityOptions, profilePicOptions } from './options';

const randomIndex = (arr: any[]): number => Math.floor(Math.random() * arr.length);

const createRandomCohort = () => {
  return `${cohorts[randomIndex(cohorts)]} ${Math.floor(Math.random() * cohortNumRange)}`;
};

const mockGraduateInvitations = mockGradInvites.map((doc) => ({
  ...doc,
  cohort: createRandomCohort(),
}));

const getRandomCities = (num: number) => {
  let cities: string[] = [];
  for (let i = 0; i <= num; i++) {
    const randoIndex = randomIndex(cityOptions);
    if (cities.includes(cityOptions[randoIndex])) continue;
    cities.push(cityOptions[randoIndex]);
  }
  return cities;
};

const mockAlumniWithCities = mockAlumni.map((alum) => {
  return {
    ...alum,
    cities: getRandomCities(Math.floor(Math.random() * 4)),
  };
});

const createDocs = async (name: string, mockData: any) => {
  const label = name[0] + name.slice(1).toLowerCase();
  try {
    console.log(`✍️ Writing ${label} mock data to JSON...`);
    await fs.promises.writeFile(
      path.join(__dirname, `../mockData/MOCK_${name}.json`),
      JSON.stringify(mockData),
      'utf8',
    );
    console.log(`🚀 MOCK_${name}.json written`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  password: string;
}

const mockUsersHashedPassword = mockUsers.map((user) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(user.password, salt);
  return {
    ...user,
    password: hashedPass,
  };
});

const finalMockUsers = mockUsersHashedPassword.map((user) => {
  if (user.email === 'tester@codehammers.com') return user;
  return {
    ...user,
    profilePic: profilePicOptions[randomIndex(profilePicOptions)],
  };
});

const generateData = async () => {
  try {
    console.log('⚡️ Generating JSON data ⚡️');
    await createDocs('ALUMNI', mockAlumniWithCities);
    await createDocs('GRADUATE_INVITATIONS', mockGraduateInvitations);
    await createDocs('USERS', finalMockUsers);
    await createDocs('FORUMS', mockForums);
    console.log('🏆 Mock data written to JSON');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  process.exit(0);
};

generateData();
