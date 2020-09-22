import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class ButtonLinkComponent extends Component {
  @computed('args.model', 'args.models')
  get modelOrModels() {
   let hasModel = 'model' in this.args;
   let hasModels = 'models' in this.args;

   if (hasModel) {
     return [this.args.model];
   } else if (hasModels) {
     return this.args.models;
   }
   return [];
  }
}
