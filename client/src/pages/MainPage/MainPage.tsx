import React from 'react';
import { useAppSelector } from '../../app/hooks';

const MainPage = (): JSX.Element => {
  const user = useAppSelector((state) => state.user.userData);

  return (
    <div className="pt-40 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-4">Welcome!</h1>

      <section className="w-full max-w-4xl p-4 mt-4 bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg flex md:flex-row flex-col items-center gap-4">
        <img
          src="https://picsum.photos/200/300?grayscale"
          alt="Description of Image 1"
          className="flex-shrink-0 w-full md:w-1/2 rounded-lg object-cover"
          style={{ maxHeight: '300px' }}
        />
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">About Code Hammers</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula eu erat
            sollicitudin porttitor. Nunc congue mi eget nunc dapibus dictum.Duis tempus diam ac
            massa bibendum, sed tempus sapien posuere. In elementum enim ac dui interdum porta.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac.
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl p-4 mt-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg flex md:flex-row flex-col items-center gap-4">
        <img
          src="https://picsum.photos/200/300?grayscale"
          alt="Description of Image 1"
          className="flex-shrink-0 w-full md:w-1/2 rounded-lg object-cover md:order-last"
          style={{ maxHeight: '300px' }}
        />
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">Features</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula eu erat
            sollicitudin porttitor. Nunc congue mi eget nunc dapibus dictum. Duis tempus diam ac
            massa bibendum, sed tempus sapien posuere. In elementum enim ac dui interdum porta.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac.
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl p-4 mt-4 bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg flex md:flex-row flex-col items-center gap-4">
        <img
          src="https://picsum.photos/200/300?grayscale"
          alt="Description of Image 1"
          className="flex-shrink-0 w-full md:w-1/2 rounded-lg object-cover"
          style={{ maxHeight: '300px' }}
        />
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">Get Started!</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula eu erat
            sollicitudin porttitor. Nunc congue mi eget nunc dapibus dictum.Duis tempus diam ac
            massa bibendum, sed tempus sapien posuere. In elementum enim ac dui interdum porta.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac.
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl p-4 mt-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg flex md:flex-row flex-col items-center gap-4">
        <img
          src="https://picsum.photos/200/300?grayscale"
          alt="Description of Image 1"
          className="flex-shrink-0 w-full md:w-1/2 rounded-lg object-cover md:order-last"
          style={{ maxHeight: '300px' }}
        />
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">Boopity Bops</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula eu erat
            sollicitudin porttitor. Nunc congue mi eget nunc dapibus dictum. Duis tempus diam ac
            massa bibendum, sed tempus sapien posuere. In elementum enim ac dui interdum porta.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac.
          </p>
        </div>
      </section>

      <section className="w-full max-w-4xl p-4 mt-4 bg-gradient-to-l from-gray-700 via-gray-800 to-gray-900 rounded-lg shadow-lg flex md:flex-row flex-col items-center gap-4">
        <img
          src="https://picsum.photos/200/300?grayscale"
          alt="Description of Image 1"
          className="flex-shrink-0 w-full md:w-1/2 rounded-lg object-cover"
          style={{ maxHeight: '300px' }}
        />
        <div className="flex-grow">
          <h3 className="text-2xl font-bold mb-2">Bopitty Boops</h3>
          <p className="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in ligula eu erat
            sollicitudin porttitor. Nunc congue mi eget nunc dapibus dictum.Duis tempus diam ac
            massa bibendum, sed tempus sapien posuere. In elementum enim ac dui interdum porta.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
