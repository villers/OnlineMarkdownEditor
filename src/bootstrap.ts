'use strict';

import './app/app';
import './index.styl';
import './preview.styl';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['artifact']);
});
