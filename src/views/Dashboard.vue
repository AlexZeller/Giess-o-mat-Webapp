<template>
  <div>
    <v-container fluid pa-3>
      <v-row justify="center">
        <p class="text-center font-weight-bold title">Sensorwerte</p>
      </v-row>
      <v-row>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-5">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-card-subtitle class="pb-0">Lufttemperatur</v-card-subtitle>
              </v-row>
              <v-row>
                <v-col col="6" class="d-flex justify-end pr-0"
                  ><v-icon
                    x-large
                    class="d-flex justify-center align-center pr-6"
                  >
                    mdi-thermometer
                  </v-icon>
                </v-col>
                <v-col col="6" class="pl-0">
                  <v-card-title
                    class="grey--text text--darken-2 d-flex justify-space-between "
                    >{{ sensordata.air_temp }}°C</v-card-title
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-5">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-card-subtitle class="pb-0"
                  >Relative Luftfeuchtigkeit</v-card-subtitle
                >
              </v-row>
              <v-row>
                <v-col col="6" class="d-flex justify-end pr-0"
                  ><v-icon
                    x-large
                    class="d-flex justify-center align-center pr-6"
                  >
                    mdi-weather-windy
                  </v-icon>
                </v-col>
                <v-col col="6" class="pl-0">
                  <v-card-title
                    class="grey--text text--darken-2 d-flex justify-space-between "
                    >{{ sensordata.air_humid }} %</v-card-title
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-5">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-card-subtitle class="pb-0"
                  >Volumetrische Bodenfeuchte</v-card-subtitle
                >
              </v-row>
              <v-row>
                <v-col col="6" class="d-flex justify-end pr-0"
                  ><v-icon
                    x-large
                    class="d-flex justify-center align-center pr-6"
                  >
                    mdi-water-percent
                  </v-icon>
                </v-col>
                <v-col col="6" class="pl-0">
                  <v-card-title
                    class="grey--text text--darken-2 d-flex justify-space-between "
                    >{{ sensordata.soil_humid }} %</v-card-title
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-5">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-card-subtitle class="pb-0">Bodentemperatur</v-card-subtitle>
              </v-row>
              <v-row>
                <v-col col="6" class="d-flex justify-end pr-0"
                  ><v-icon
                    x-large
                    class="d-flex justify-center align-center pr-6"
                  >
                    mdi-coolant-temperature
                  </v-icon>
                </v-col>
                <v-col col="6" class="pl-0">
                  <v-card-title
                    class="grey--text text--darken-2 d-flex justify-space-between "
                    >{{ sensordata.soil_temp }}°C</v-card-title
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-5">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-card-subtitle class="pb-0"
                  >Beleuchtungsstärke</v-card-subtitle
                >
              </v-row>
              <v-row>
                <v-col col="6" class="d-flex justify-end pr-0"
                  ><v-icon
                    x-large
                    class="d-flex justify-center align-center pr-6"
                  >
                    mdi-weather-sunny
                  </v-icon>
                </v-col>
                <v-col col="6" class="pl-0">
                  <v-card-title
                    class="grey--text text--darken-2 d-flex justify-space-between "
                    >{{ sensordata.lux }} Lux</v-card-title
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-5">
            <v-container fluid class="pa-0 ">
              <v-row class="justify-center ">
                <v-card-subtitle class="pb-0">Wasserstand</v-card-subtitle>
              </v-row>
              <v-row>
                <v-col col="6" class="d-flex justify-end "
                  ><v-icon
                    x-large
                    class="d-flex justify-center align-center pa-0 pr-3"
                  >
                    mdi-car-coolant-level
                  </v-icon>
                </v-col>
                <v-col col="6" class="pl-0">
                  <v-card-title
                    class="grey--text text--darken-2 d-flex justify-space-between  pt-4"
                    >{{ sensordata.waterlevel }} %</v-card-title
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" class="pt-4 font-weight-bold title">
        <p class="text-center">Status</p>
      </v-row>
      <v-row>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-3">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-col col="12" class="pa-0">
                  <v-card-subtitle class="pa-3 text-center"
                    >Beleuchtung</v-card-subtitle
                  >
                </v-col>
              </v-row>
              <v-row class="justify-center"> </v-row>
              <v-row>
                <v-col col="12" class="d-flex justify-center pt-0 pr-0">
                  <v-icon
                    x-large
                    class="d-flex justify-center align-center"
                    v-if="light_status == false"
                    >mdi-lightbulb-off</v-icon
                  >
                  <v-icon
                    x-large
                    class="d-flex justify-center align-center"
                    color="yellow accent-3"
                    v-if="light_status == true"
                    >mdi-lightbulb</v-icon
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-3">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-col col="12" class="pa-0">
                  <v-card-subtitle class="pa-3 text-center"
                    >Ventilation</v-card-subtitle
                  >
                </v-col>
              </v-row>
              <v-row class="justify-center"> </v-row>
              <v-row>
                <v-col col="12" class="d-flex justify-center pr-0 pt-0">
                  <v-icon
                    x-large
                    class="d-flex justify-center align-center"
                    v-if="fan_status == false"
                    >mdi-fan-off</v-icon
                  >
                  <v-icon
                    x-large
                    class="d-flex justify-center align-center"
                    color="blue-grey"
                    v-if="fan_status == true"
                    >mdi-fan</v-icon
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col lg="3" sm="6" cols="12">
          <v-card color="light-green lighten-3">
            <v-container fluid class="pa-0">
              <v-row class="justify-center">
                <v-col col="12" class="pa-0">
                  <v-card-subtitle class="pa-3 text-center"
                    >Bewässerung</v-card-subtitle
                  >
                </v-col>
              </v-row>
              <v-row class="justify-center"> </v-row>
              <v-row>
                <v-col col="12" class="d-flex justify-center pr-0 pt-0">
                  <v-icon
                    x-large
                    class="d-flex justify-center align-center"
                    color="blue darken-2"
                    v-if="irrigation_status == true"
                    >mdi-water-pump</v-icon
                  >
                  <v-icon
                    x-large
                    class="d-flex justify-center align-center"
                    v-if="irrigation_status == false"
                    >mdi-water-pump-off</v-icon
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col
          lg="3"
          sm="6"
          cols="12"
          class="d-flex justify-center pr-6 pl-6 pt-4"
        >
          <v-container fluid class="pa-0">
            <v-row>
              <v-col cols="6" class="pl-6"
                ><v-row><div class="caption">Letzte Aktualisierung:</div></v-row
                ><v-row class="caption">{{ sensordata.timestamp }}</v-row>
              </v-col>
              <v-col cols="6" class="d-flex justify-end pr-6 pt-0">
                <v-icon
                  large
                  class="d-flex justify-end align-end"
                  @click.stop="refreshSocket()"
                  >mdi-refresh</v-icon
                >
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Dashboard',
  data: () => ({
    light_status: false,
    irrigation_status: false,
    fan_status: false,
    water_level: 0,
    sensordata: [],
  }),
  sockets: {
    connect() {
      console.log('Giess-o-mat-SocketServer connected');
      this.$socket.client.emit('light', 'status');
      this.$socket.client.emit('fan', 'status');
      this.$socket.client.emit('irrigation', 'status');
    },
    disconnect() {
      console.log('Giess-o-mat-SocketServer disonnected');
    },
    irrigation(data) {
      this.irrigation_status = data;
    },
    light(data) {
      this.light_status = data;
    },
    fan(data) {
      this.fan_status = data;
    },
  },
  methods: {
    refreshSocket() {
      this.$socket.client.emit('sensordata', true);
      console.log('test');
    },
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_ROOT_API + '/sensordata/current')
      .then((response) => (this.sensordata = response.data));
    this.$socket.client.emit('light', 'status');
    this.$socket.client.emit('fan', 'status');
    this.$socket.client.emit('irrigation', 'status');
  },
};
</script>
