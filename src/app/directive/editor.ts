module artifact {
  'use strict';

  import IWindowService = angular.IWindowService;
  import IDirective = angular.IDirective;

  interface IDocument {
    name: string;
    text: string
    url: string;
  }

  class EditorCtrl {
    private document: IDocument;

    private tooltiptext: any = {
      Download: 'Download',
      Title: `
        # H1<br>
        ## H2<br>
        ### H3<br>
        #### H4<br>
        ##### H5<br>
        ###### H6<br>`,
      'List': `
        1. First ordered list item<br>
        2. Another item<br>
        * First unordered list<br>
        * Another item<br>`,
      'Link': `
        [I'm an inline-style link](https://www.google.com)<br>
        [I'm an inline-style link with title](https://www.google.com "Google's Homepage")<br>
        [I'm a relative reference to a repository file](../blob/master/LICENSE)<br>`,
    };


    /** @ngInject */
    constructor(private $localStorage: any, private $window: IWindowService) {
      this.document = this.$localStorage.document;
      this.download();
    }

    download() {
      var blob = new Blob([this.$localStorage.document.text], {
        type: 'text/plain'
      });
      this.document.url = this.$window.URL.createObjectURL(blob);
    }
  }

  /**
   * show editor
   * <editor></editor>
   */
  export class EditorDirective {
    static Factory(): IDirective {
      return {
        template: `
          <div class="container">
              <div class="container-box shadow">
                    <div class="header">
                        <div class="input-field">
                          <label id="doc_name">Document Name</label>
                          <input class="title-document" for="doc_name" placeholder="yourdocumentname.md" type="text" ng-model="vm.document.name" class="validate">
                        </div>
                    </div>

                    <div class="row">
                        <div class="editor col s12">

                        <div class="col s6">
                          <div class="editor-header">
                            <div class="page-header">
                                <h3 class="title"><i class="material-icons left">create</i>Markdown</h3>
                            </div>
                            <!--
                            <span class="text-right">
                              <a href="#" tooltip="{{vm.tooltiptext.Title}}">Title</a>
                              <a href="#" tooltip="{{vm.tooltiptext.List}}">List</a>
                              <a href="#" tooltip="{{vm.tooltiptext.Link}}">Link</a>
                            </span>
                            -->

                            <textarea class="split split-editor" wrap="off" autocapitalize="off" spellcheck="false" ng-model="vm.document.text" ng-change="vm.download()"></textarea>

                          </div>
                         </div>

                         <div class="col s6">
                              <div class="editor-header">
                                <div class="page-header">
                                    <h3 class="title"><i class="material-icons left">remove_red_eye</i>Preview</h3>
                                </div>
                              </div>

                              <div class="container-preview">
                                <div class="split split-preview" markdown="vm.document.text"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fixed-action-btn" style="bottom: 45px; right: 24px;">
            <a class="btn-floating btn-large">
              <i class="material-icons">add</i>
            </a>
            <ul>
              <li>
                 <a class="btn-floating darken-1" style="transform: scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0px); opacity: 0;"><i class="material-icons">help_outline</i></a>
              </li>
              <li>
                <a class="btn-floating tooltipped" data-position="left" data-delay="20" data-tooltip="{{vm.tooltiptext.Download}}" ng-href="{{vm.document.url}}" download="{{vm.document.name}}"><i class="material-icons">file_download</i></a>
              </li>
            </ul>
          </div>
          </div>
        `,
        replace: true,
        controller: EditorCtrl,
        controllerAs: 'vm'
      };
    }
  }
}
