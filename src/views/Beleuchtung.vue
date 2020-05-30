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
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
//import axios from 'axios';

export default {
  name: 'Beleuchtung',
  data: () => ({
    light_status: false,
  }),
  sockets: {
    connect() {
      console.log('Giess-o-mat-SocketServer connected');
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
  },
};
</script>
