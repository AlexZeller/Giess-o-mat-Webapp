<template>
  <div>
    <v-select
      label="Sensor"
      item-text="label"
      item-value="id"
      :items="sensors"
      v-model="sensor"
      v-on:change="getChartData"
    >
    </v-select>
    <TrendChart :sensor="sensor" :label="label" ref="TrendChart" />
  </div>
</template>

<script>
// @ is an alias to /src
import TrendChart from '../components/TrendChart.vue';

export default {
  name: 'Zeitreihen',
  components: { TrendChart },
  data: () => ({
    label: 'Test',
    graph_hours: 24,
    sensor: 'air_temp',
    sensors: [
      { id: 'air_temp', label: 'Lufttemperatur' },
      { id: 'air_humid', label: 'Relative Luftfeuchtigkeit' },
      { id: 'soil_humid', label: 'Volumetrische Bodenfeuchte' },
      { id: 'soil_temp', label: 'Bodentemperatur' },
      { id: 'lux', label: 'Beleuchtungsstärke' },
      { id: 'waterlevel', label: 'Wasserstand' },
    ],
  }),
  mounted() {
    this.$refs.TrendChart.getChartData(this.sensor, this.graph_hours);
  },
  methods: {
    getChartData: function() {
      this.$refs.TrendChart.getChartData(this.sensor, this.graph_hours);
    },
  },
};
</script>
