<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <p class="text-center font-weight-bold title">Bewässerung</p>
      </v-row>
      <v-row justify="center" class="pa-3">
        <v-btn
          x-large
          @click="
            irrigation_status = !irrigation_status;
            irrigationSocket();
          "
        >
          <v-icon color="blue darken-2" v-if="irrigation_status == true"
            >mdi-water-pump</v-icon
          >
          <v-icon v-if="irrigation_status == false">mdi-water-pump-off</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="pa-3">
        <v-subheader>Einstellungen</v-subheader>
      </v-row>
      <v-row
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Modus:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ irrigation_settings.mode }}</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          irrigation_settings.mode == 'Bodenfeuchtesteuerung' ||
            irrigation_settings.mode == 'Zeit- und Bodenfeuchtesteuerung'
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Schwellenwert Bodenfeuchte:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ irrigation_settings.humidity_threshold }} %</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          irrigation_settings.mode != 'Manuell' &&
            irrigation_settings.mode != 'Bodenfeuchtesteuerung'
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Intervall:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p v-if="irrigation_settings.interval == 1">Jeden Tag</p>
          <p v-else>Jeden {{ irrigation_settings.interval }}. Tag</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          irrigation_settings.mode != 'Manuell' &&
            irrigation_settings.mode != 'Bodenfeuchtesteuerung' &&
            irrigation_settings.interval == 1
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Anzahl Bewässerungen:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ irrigation_settings.number_irrigations }}</p>
        </v-col>
      </v-row>
      <v-row v-if="irrigation_settings.mode != 'Manuell'" class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Dauer Bewässerung</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ irrigation_settings.duration_irrigation }} s</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          irrigation_settings.mode != 'Manuell' &&
            irrigation_settings.mode != 'Bodenfeuchtesteuerung'
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Zeitpunkt Bewässerung</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ irrigation_settings.irrigation_time_1 }} Uhr</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          irrigation_settings.mode != 'Manuell' &&
            irrigation_settings.mode != 'Bodenfeuchtesteuerung' &&
            irrigation_settings.number_irrigations != 1
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Zeitpunkt 2. Bewässerung</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ irrigation_settings.irrigation_time_2 }} Uhr</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          irrigation_settings.mode != 'Manuell' &&
            irrigation_settings.mode != 'Bodenfeuchtesteuerung' &&
            irrigation_settings.number_irrigations == 3
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Zeitpunkt 3. Bewässerung</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ irrigation_settings.irrigation_time_2 }} Uhr</p></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Bewaesserung',
  data: () => ({
    irrigation_status: false,
    irrigation_settings: null,
  }),
  sockets: {
    connect() {
      console.log('Giess-o-mat-SocketServer connected');
      this.$socket.client.emit('irrigation', 'status');
    },

    disconnect() {
      console.log('Giess-o-mat-SocketServer disonnected');
    },
    // Fired when the server sends something on the "fan" channel.
    irrigation(data) {
      this.irrigation_status = data;
    },
  },
  methods: {
    irrigationSocket() {
      this.$socket.client.emit('irrigation', this.irrigation_status);
    },
  },
  created() {
    this.$socket.$subscribe('irrigation', (data) => {
      console.log(data);
    });
  },
  mounted() {
    this.$socket.client.emit('irrigation', 'status');
    axios
      .get(process.env.VUE_APP_ROOT_API + '/settings/irrigation')
      .then((response) => (this.irrigation_settings = response.data));
  },
};
</script>
