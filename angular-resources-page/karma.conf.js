// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

import { join } from 'path';
import karmaJasmine from 'karma-jasmine';
import karmaChromeLauncher from 'karma-chrome-launcher';
import karmaJasmineHtmlReporter from 'karma-jasmine-html-reporter';
import karmaCoverage from 'karma-coverage';
import { buildAngularPlugin } from '@angular-devkit/build-angular/plugins/karma';

export default function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', buildAngularPlugin],
    plugins: [
      karma-jasmine,
      karma-chrome-launcher,
      karma-jasmine-html-reporter,
      karma-coverage,
      @angular-devkit/build-angular/plugins/karma
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: join(__dirname, './coverage/angular-contact-page'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
