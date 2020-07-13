<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <p class="text-center font-weight-bold title">Beleuchtung</p>
      </v-row>
      <v-row justify="center" class="pa-3">
        <v-btn
          x-large
          @click.stop="
            light_status = !light_status;
            lightSocket();
          "
        >
          <v-icon v-if="light_status == false">mdi-lightbulb-off</v-icon>
          <v-icon color="yellow accent-3" v-if="light_status == true"
            >mdi-lightbulb</v-icon
          >
        </v-btn>
      </v-row>
      <v-row justify="center" class="pa-3">
        <v-subheader>Einstellungen</v-subheader>
      </v-row>
      <v-row
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Modus:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ light_settings.mode }}</p></v-col
        >
      </v-row>
      <v-row v-if="light_settings.mode != 'Manuell'" class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Einschalt-Zeit:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ light_settings.start_time }} Uhr</p></v-col
        >
      </v-row>
      <v-row v-if="light_settings.mode != 'Manuell'" class="body-2"
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Ausschalt-Zeit:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ light_settings.end_time }} Uhr</p></v-col
        >
      </v-row>
      <v-row
        v-if="light_settings.mode == 'Zeit- und Helligkeitssteuerung'"
        class="body-2"
        ><v-col cols="6" class="body-2 text--secondary"
          ><p>Minimale Beleuchtungsstärke:</p></v-col
        ><v-col class="body-2"
          ><p>{{ light_settings.lux_threshold }} Lux</p></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Beleuchtung',
  data: () => ({
    light_status: false,
    light_settings: null,
  }),
  sockets: {
    connect() {
      console.log('Giess-o-mat-SocketServer connected');
      this.$socket.client.emit('light', 'status');
    },
    disconnect() {
      console.log('Giess-o-mat-SocketServer socket disonnected');
    },

    // Fired when the server sends something on the "fan" channel.
    light(data) {
      this.light_status = data;
    },
  },
  methods: {
    lightSocket() {
      this.$socket.client.emit('light', this.light_status);
    },
  },
  created() {
    this.$socket.$subscribe('light', (data) => {
      console.log(data);
    });
  },
  mounted() {
    this.$socket.client.emit('light', 'status');
    axios
      .get(process.env.VUE_APP_ROOT_API + '/settings/light')
      .then((response) => (this.light_settings = response.data));
  },
};
</script>
