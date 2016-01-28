module artifact {
  'use strict';

  import IDirective = angular.IDirective;

  /**
   * show navbar
   * <navbar></navbar>
   */
  export class NavbarDirective {
    /** @ngInject */
    static Factory(): IDirective {
      return {
        template: `
          <nav class="navigation clearfix">
            <div class="nav-wrapper">
                <a href=""><img src="app/img/md.png" alt="logo" class="logo" /></a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                  <li><a href="http://www.writage.com/" target="_blank">Markdown plugin for Microsoft Word</a></li>
                </ul>
            </div>
          </nav>
        `,
        replace: true
      };
    }
  }
}
