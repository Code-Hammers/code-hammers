export const isValidEmail = (email: string) => {
  // return email.match(/[\w\d.]+@[a-z]+.[\w]+$/gim);
  if (!email || typeof email !== 'string') return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
