<template>
  <div>
    <v-container fluid>
      <v-select
        label="Sensor"
        item-text="label"
        item-value="id"
        :items="sensors"
        v-model="sensor"
        v-on:change="getChartData"
        class="pb-4"
      >
      </v-select>
      <TrendChart
        :sensor="sensor"
        :label="graph_label"
        :color="graph_color"
        ref="TrendChart"
      />
      <v-container fluid>
        <v-row>
          <v-col cols="6" class="d-flex justify-center">
            <v-chip :color="graph_color" small text-color="white">
              Minimum: {{ graph_min_value }}
            </v-chip>
          </v-col>
          <v-col cols="6" class="d-flex justify-center">
            <v-chip :color="graph_color" small text-color="white">
              Maximum: {{ graph_max_value }}
            </v-chip>
          </v-col>
        </v-row>
        <v-row class="justify-center pt-4">
          <v-btn-toggle
            v-model="graph_hours"
            v-on:change="getChartData"
            mandatory
            borderless
            color="primary"
          >
            <v-btn small value="12">
              12
            </v-btn>
            <v-btn small value="24">
              24
            </v-btn>
            <v-btn small value="72">
              3T
            </v-btn>
            <v-btn small value="1680">
              7T
            </v-btn>
          </v-btn-toggle>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import TrendChart from '../components/TrendChart.vue';
import axios from 'axios';

export default {
  name: 'Zeitreihen',
  components: { TrendChart },
  data: () => ({
    graph_color: 'rgba(3, 107, 252)',
    graph_label: 'Lufttemperatur in °C',
    graph_hours: '24',
    graph_max: 0,
    graph_max_value: 0,
    graph_min_value: 0,
    graph_min: 0,
    sensor: 'air_temp',
    sensors: [
      {
        id: 'air_temp',
        label: 'Lufttemperatur',
      },
      {
        id: 'air_humid',
        label: 'Relative Luftfeuchtigkeit',
      },
      {
        id: 'soil_humid',
        label: 'Volumetrische Bodenfeuchte',
      },
      {
        id: 'soil_temp',
        label: 'Bodentemperatur',
      },
      {
        id: 'lux',
        label: 'Beleuchtungsstärke',
      },
      {
        id: 'waterlevel',
        label: 'Wasserstand',
      },
    ],
  }),
  mounted() {
    this.$refs.TrendChart.getChartData(this.sensor, parseInt(this.graph_hours));
  },
  methods: {
    getChartData: function() {
      this.getGraphStyling();
      this.$refs.TrendChart.getChartData(this.sensor, this.graph_hours);
      axios
        .get(
          process.env.VUE_APP_ROOT_API +
            '/sensordata/' +
            this.sensor +
            '/' +
            this.graph_hours +
            '/max'
        )
        .then((response) => (this.graph_max = response.data))
        .then(() => {
          let property = 'MAX(' + this.sensor + ')';
          console.log(property);
          let extreme = this.graph_max[0][property];
          this.graph_max_value = extreme;
        });
      axios
        .get(
          process.env.VUE_APP_ROOT_API +
            '/sensordata/' +
            this.sensor +
            '/' +
            this.graph_hours +
            '/min'
        )
        .then((response) => (this.graph_min = response.data))
        .then(() => {
          let property = 'MIN(' + this.sensor + ')';
          console.log(property);
          let extreme = this.graph_min[0][property];
          this.graph_min_value = extreme;
        });
    },
    getGraphStyling: function() {
      if (this.sensor == 'air_temp') {
        this.graph_label = 'Lufttemperatur in °C';
        this.graph_color = 'rgba(3, 107, 252)';
      } else if (this.sensor == 'air_humid') {
        this.graph_label = 'Relative Luftfeuchtigkeit in %';
        this.graph_color = 'rgba(52, 207, 235)';
      } else if (this.sensor == 'soil_humid') {
        this.graph_label = 'Volumetrische Bodenfeuchte in %';
        this.graph_color = 'rgba(19, 161, 123)';
      } else if (this.sensor == 'soil_temp') {
        this.graph_label = 'Bodentemperatur in °C';
        this.graph_color = 'rgba(161, 69, 19)';
      } else if (this.sensor == 'lux') {
        this.graph_label = 'Beleuchtungsstärke in Lux';
        this.graph_color = 'rgba(235, 183, 52)';
      } else if (this.sensor == 'waterlevel') {
        this.graph_label = 'Wasserstand in weißichnicht';
        this.graph_color = 'rgba(67, 52, 235)';
      }
    },
  },
};
</script>
