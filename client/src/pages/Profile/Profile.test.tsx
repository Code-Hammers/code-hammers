import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchUserProfile } from '../../features/userProfile/userProfileSlice';
import { useParams } from 'react-router-dom';

jest.mock('../../app/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../features/userProfile/userProfileSlice', () => ({
  fetchUserProfile: jest.fn(),
}));

describe('Profile Component', () => {
  const mockDispatch = jest.fn();
  const mockUserId = '123456';
  const mockUserProfile = {
    user: mockUserId,
    firstName: 'John',
    lastName: 'Doh',
    cohort: '42'
  };
  //TODO MOCK BETTER USERPROFILE DATA??
  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useParams as jest.Mock).mockReturnValue({ userId: mockUserId });
    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        userProfile: { profile: mockUserProfile },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Profile component', () => {
    render(<Profile />);
    screen.debug(); // Print the rendered output to the console
    const profileTitle = screen.getByText('Profile');
    expect(profileTitle).toBeInTheDocument();
  });
  
  
  it('dispatches fetchUserProfile on component mount', () => {
    render(<Profile />);
    expect(mockDispatch).toHaveBeenCalledWith(fetchUserProfile(mockUserId));
  });

  it("displays the user's full name", () => {
    render(<Profile />);
  
    const userNameDisplay = screen.getByText((content, element) => {
      const hasText = (node: Node) => node.textContent === `${mockUserProfile.firstName} ${mockUserProfile.lastName} [${mockUserProfile.cohort}]`;
      const elementHasText = element ? hasText(element) : false;
      const childrenDontHaveText = Array.from(element?.children || []).every(
        (child) => !hasText(child)
      );
      return elementHasText && childrenDontHaveText;
    });
  
    expect(userNameDisplay).toBeInTheDocument();
  });
  
});
