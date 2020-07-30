import Component from '@glimmer/component';
// import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// const months = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

export default class LiftRecordsLineChartComponent extends Component {
  @tracked _year;
  @tracked liftRecords;

  constructor() {
    super(...arguments)
    this.liftRecords = this.args.liftRecords.sortBy('date').reverse()
  }

  get year() {
    return this._year || new Date().getFullYear();
  }

  get exerciseName() {
    if (this.liftRecords) {
      return this.liftRecords.firstObject.exercise.name;
    }

    return null
  }

  generateChartData(liftRecords, reps) {
    const liftRecordsLimit = 15;

    const series = [{
      data: [],
      name: 'Date lift record was achieved'
    }]

    const xAxis = {
      categories: [],
    }

    if (liftRecords.length > liftRecordsLimit) {
      liftRecords = liftRecords.slice(liftRecords.length - liftRecordsLimit)
    }

    liftRecords = liftRecords.filterBy('reps', reps);

    liftRecords.forEach((item) => {
      xAxis.categories.push(new Date(item.date).toLocaleDateString())
      series[0].data.push(item.weightLifted)
    });

    return {
      chart: {
        type: 'line'
      },
      title: {
        text: `${reps} Rep Max Prgression`
      },
      subtitle: {
         text: this.exerciseName
      },
      xAxis,
      series
    }
  }

  get charts() {
    const charts = [];

    for (var i = 1; i <= 3; i++) {
      charts.push(this.generateChartData(this.liftRecords, i))
    }

    return charts;
  }

  get showCharts() {
    return this.charts.some(chart => chart.xAxis.categories.length > 1);
  }
}
