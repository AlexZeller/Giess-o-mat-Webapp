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
      <v-container class="d-flex pt-6 justify-center">
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
          <v-btn small value="168">
            7T
          </v-btn>
        </v-btn-toggle>
      </v-container>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import TrendChart from '../components/TrendChart.vue';

export default {
  name: 'Zeitreihen',
  components: { TrendChart },
  data: () => ({
    graph_color: 'rgba(3, 107, 252)',
    graph_label: 'Lufttemperatur in °C',
    graph_hours: '24',
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
