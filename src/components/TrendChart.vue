<template>
  <div>
    <line-chart v-if="loaded" :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from '../components/Chart.vue';
export default {
  name: 'TrendChart',
  props: {
    sensor: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: null,
    },
  },
  components: { LineChart },
  data: () => ({
    loaded: false,
    Data: [],
    chartdata: null,
    options: {
      scales: {
        xAxes: [
          {
            type: 'time',
            ticks: {
              maxTicksLimit: 10,
            },
            time: {
              displayFormats: {
                minute: 'HH:mm',
                hour: 'HH:mm',
                day: 'dd D.M',
              },
            },
          },
        ],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.loaded = false;
  },
  methods: {
    getChartData: function(sensor, hours) {
      this.loaded = false;
      try {
        axios
          .get(process.env.VUE_APP_ROOT_API + `/sensordata/${sensor}/${hours}`)
          .then((response) => (this.Data = response.data))
          .then(
            () => (
              (this.chartdata = this.formatChartData()), (this.loaded = true)
            )
          );
      } catch (e) {
        console.error(e);
      }
    },
    formatChartData: function() {
      var dataObj = {
        labels: this.getTimesArray(this.Data),
        datasets: [
          {
            label: this.label,
            fill: false,
            data: this.getDataArray(this.Data),
            borderColor: [this.color],
          },
        ],
      };
      return dataObj;
    },
    getDataArray: function(Data) {
      var Array = [];
      Data.forEach((element) => {
        Array.push(element[this.sensor]);
      });
      return Array;
    },
    getTimesArray: function(TempData) {
      var TimesArray = [];
      TempData.forEach((element) => {
        TimesArray.push(element.timestamp);
      });
      return TimesArray;
    },
  },
};
</script>
