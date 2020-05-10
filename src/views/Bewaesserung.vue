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
      console.log('socket connected');
    },

    disconnect() {
      console.log('socket disonnected');
    },
  },
  methods: {
    irrigationSocket() {
      this.$socket.client.emit('irrigation', this.irrigation_status);
    },
  },
};
</script>
