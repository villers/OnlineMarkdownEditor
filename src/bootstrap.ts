'use strict';

import './app/app';
import './index.styl';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['artifact']);
});
