import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { set } from '@ember/object';
// import defaultTheme from '../themes/default-theme';

export default class LiftRecordsComponent extends Component {
  @tracked showSortModal = false;
  @tracked showFilterModal = false;
  @tracked selectedSortOption;
  @tracked filterOptions;
  @tracked selectedRep;

  chartOptions = {
    chart: {
      type: 'line'
    },
    title: {
       text: 'Chart reflow is set to true'
   },

   subtitle: {
       text: 'When resizing the window or the frame, the chart should resize'
   },

   xAxis: {
       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   },

   series: [{
       data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
   }]
  }

  chartData = [{
      name: 'Jane',
      data: [1, 0, 4]
    }, {
      name: 'John',
      data: [5, 7, 3]
    }
  ]


  constructor() {
    super(...arguments);
    this.sortOptions = [
      { key: "date", label: "Date" },
      { key: "weightLifted", label: "Weight Lifted" },
      { key: "reps", label: "Reps" }
    ]
    this.filterOptions = {
      reps: {
        options: [
          { value: 1, label: '1 Rep Max'},
          { value: 2, label: '2 Rep Max'},
          { value: 3, label: '3 Rep Max'},
          { value: 4, label: '4 Rep Max'},
          { value: 5, label: '5 Rep Max'}
        ],
        selected: null
      }
    }

    this.selectedRep = this.filterOptions.reps.selected;

  }

  get data() {

  }

  get filtersApplied() {
    return !!this.selectedRep
  }

  @action
  toggleSortModal() {
    this.showSortModal = !this.showSortModal;
  }

  @action
  toggleFilterModal() {
    this.showFilterModal = !this.showFilterModal;
  }

  @action
  onSelectSortOption(option) {
    this.selectedSortOption = option;
    this.toggleSortModal();
  }

  @action
  onSelectFilterOption(option) {
    set(this.filterOptions.reps, 'selected', option);
    this.selectedRep = option;
  }

  @action resetRepsFilter() {
    set(this.filterOptions.reps, 'selected', null);
    this.selectedRep = null;
  }

  get route() {
    return this.args.route || 'exercises.exercise.records.record'
  }

  get records() {
    let records = this.args.records;

    if (this.sortOptionIsSelected) {
      records = records.sortBy(this.selectedSortOption.key).reverse();
    } else {
      records = records.sortBy('date').reverse();
    }


    if (this.filtersApplied) {
      return records.filterBy('reps', this.selectedRep.value);
    }

    return records
  }

  get sortOptionIsSelected() {
    return isPresent(this.selectedSortOption);
  }
}
