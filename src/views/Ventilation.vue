<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <p class="text-center font-weight-bold title">Ventilation</p>
      </v-row>
      <v-row justify="center" class="pa-3">
        <v-btn
          x-large
          @click.stop="
            fan_status = !fan_status;
            fanSocket();
          "
        >
          <v-icon v-if="fan_status == false">mdi-fan-off</v-icon>
          <v-icon color="blue-grey" v-if="fan_status == true">mdi-fan</v-icon>
        </v-btn>
      </v-row>
      <v-row justify="center" class="pa-3">
        <v-subheader>Einstellungen</v-subheader>
      </v-row>
      <v-row
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Modus:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ ventilation_settings.mode }}</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          ventilation_settings.mode == 'Lufttemperatursteuerung' ||
            ventilation_settings.mode ==
              'Lufttemperatur- und Luftfeuchtesteuerung'
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Schwellenwert Lufttemperatur:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ ventilation_settings.Ta_max }} °C</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          ventilation_settings.mode == 'Luftfeuchtesteuerung' ||
            ventilation_settings.mode ==
              'Lufttemperatur- und Luftfeuchtesteuerung'
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Schwellenwert Luftfeuchte:</p></v-col
        ><v-col class="body-2 pt-0 pb-0"
          ><p>{{ ventilation_settings.Rh_max }} %</p></v-col
        >
      </v-row>
      <v-row v-if="ventilation_settings.mode != 'Manuell'" class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Nachtruhe:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><v-icon v-if="ventilation_settings.mode_ventilation_stop"
            >mdi-check</v-icon
          ><v-icon v-else>mdi-minus</v-icon></v-col
        >
      </v-row>
      <v-row
        v-if="
          ventilation_settings.mode_ventilation_stop &&
            ventilation_settings.mode != 'Manuell'
        "
        class="body-2 "
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Beginn Nachtruhe:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ ventilation_settings.start_time }} Uhr</p></v-col
        >
      </v-row>
      <v-row
        v-if="
          ventilation_settings.mode_ventilation_stop &&
            ventilation_settings.mode != 'Manuell'
        "
        class="body-2"
        ><v-col cols="6" class="body-2 text--secondary pt-0 pb-0"
          ><p>Ende Nachtruhe:</p></v-col
        ><v-col cols="6" class="body-2 pt-0 pb-0"
          ><p>{{ ventilation_settings.end_time }} Uhr</p></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  data() {
    return {
      fan_status: false,
      ventilation_settings: null,
    };
  },

  sockets: {
    connect() {
      console.log('Giess-o-mat-SocketServer connected');
    },

    disconnect() {
      console.log('Giess-o-mat-SocketServer disonnected');
    },

    // Fired when the server sends something on the "fan" channel.
    fan(data) {
      this.fan_status = data;
    },
  },

  methods: {
    fanSocket() {
      this.$socket.client.emit('fan', this.fan_status);
    },
  },
  created() {
    this.$socket.$subscribe('fan', (data) => {
      console.log(data);
    });
  },
  mounted() {
    this.$socket.client.emit('fan', 'status');
    axios
      .get(process.env.VUE_APP_ROOT_API + '/settings/ventilation')
      .then((response) => (this.ventilation_settings = response.data));
  },
};
</script>
