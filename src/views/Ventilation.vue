<template>
  <div>
    <v-container fluid>
      <v-btn
        @click.stop="
          fan = !fan;
          fanSocket();
        "
      >
        <v-icon v-if="fan == false">mdi-fan-off</v-icon>
        <v-icon color="blue-grey" v-if="fan == true">mdi-fan</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      fan: false,
    };
  },

  sockets: {
    connect() {
      console.log('socket connected');
    },

    disconnect() {
      console.log('socket disonnected');
    },

    // Fired when the server sends something on the "messageChannel" channel.
    message(data) {
      this.socketMessage = data;
    },
  },

  methods: {
    fanSocket() {
      this.$socket.client.emit('fan', this.fan);
    },
  },
};
</script>
