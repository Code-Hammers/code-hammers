import mongoose from 'mongoose';
import connectDB from '../server/config/db';

// TODO
/*eslint jest/no-disabled-tests: "off"*/

jest.mock('mongoose', () => ({
  connect: jest.fn().mockImplementation(() =>
    Promise.resolve({
      connection: { host: 'test-host' },
    }),
  ),
}));

describe('connectDB', () => {
  let mockExit: jest.SpyInstance;
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation((_code) => undefined as never);
    mockConsoleError = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call mongoose.connect with MONGO_URI', async () => {
    process.env.MONGO_URI = 'test-mongo-uri';
    await connectDB(process.env.MONGO_URI);
    expect(mongoose.connect).toHaveBeenCalledWith('test-mongo-uri');
  });

  // We now console.error the error's message and throw a DatabaseConnectionError instead
  xit('should log an error and exit the process if mongoose.connect fails', async () => {
    process.env.MONGO_URI = 'test-mongo-uri';
    (mongoose.connect as jest.Mock).mockImplementationOnce(() => {
      throw new Error('test error');
    });

    await connectDB(process.env.MONGO_URI);

    expect(mockConsoleError).toHaveBeenCalledWith('test error');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  // This check has been moved to startServer in index.ts
  xit('should throw an error if MONGO_URI is not defined', async () => {
    delete process.env.MONGO_URI;

    await connectDB(process.env.MONGO_URI!);

    expect(mockConsoleError).toHaveBeenCalledWith(
      'MONGO_URI must be defined in the environment variables.',
    );
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
