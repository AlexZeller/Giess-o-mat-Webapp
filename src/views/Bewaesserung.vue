<template>
  <div>
    <v-container fluid>
      <v-btn
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
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Bewaesserung',
  data: () => ({
    irrigation_status: false,
  }),
  sockets: {
    connect() {
      console.log('Giess-o-mat-SocketServer connected');
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
  },
};
</script>
