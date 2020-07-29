import Component from '@glimmer/component';
// import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// const months = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

export default class LiftRecordsLineChartComponent extends Component {
  @tracked _year;

  get year() {
    return this._year || new Date().getFullYear();
  }

  get chartOptions() {
    const series = [{
      data: []
    }]

    const xAxis = {
      categories: [],
      label: 'foo'
    }


    this.args.liftRecords.filter((item) => {
      return new Date(item.date).getFullYear() === this.year;
    }).forEach((item) => {
      xAxis.categories.push(new Date(item.date).toLocaleDateString())
      series[0].data.push(item.weightLifted)
    });

    return {
      chart: {
        type: 'line'
      },
      title: {
        text: "Most weight lifted"
      },
      subtitle: {
         text: 'When resizing the window or the frame, the chart should resize'
      },
      xAxis,
      series
    }
  }
}
