<template>
  <div>
    <v-container fluid>
      <v-btn
        @click.stop="
          fan_status = !fan_status;
          fanSocket();
        "
      >
        <v-icon v-if="fan_status == false">mdi-fan-off</v-icon>
        <v-icon color="blue-grey" v-if="fan_status == true">mdi-fan</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      fan_status: false,
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
  },
};
</script>
