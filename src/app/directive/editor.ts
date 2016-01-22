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
    constructor (private $localStorage: any, private $window: IWindowService) {
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
          <div>
            <div class="header">
              <h2 class="title">Document Name</h2>
              <input class="title-document" type="text" ng-model="vm.document.name">
            </div>

            <div class="editor">

              <div class="editor-header">
                <h3 class="title">Markdown</h3>
                <a ng-href="{{vm.document.url}}" download="{{vm.document.name}}" tooltip="{{vm.tooltiptext.Download}}"><i class="glyphicon glyphicon-download-alt"></i></a>

                <span class="text-right">
                  <a href="#" tooltip="{{vm.tooltiptext.Title}}">Title</a>
                  <a href="#" tooltip="{{vm.tooltiptext.List}}">List</a>
                  <a href="#" tooltip="{{vm.tooltiptext.Link}}">Link</a>
                </span>

              </div>

              <div class="editor-header">
                <h3 class="title">Preview</h3>
              </div>

              <textarea class="split split-editor" wrap="off" autocapitalize="off" spellcheck="false" ng-model="vm.document.text" ng-change="vm.download()"></textarea>

              <div class="split split-preview" markdown="vm.document.text"></div>

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
