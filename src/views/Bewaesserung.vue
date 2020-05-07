<template>
  <div>
    <v-container fluid>
      <v-btn
        @click="
          irrigation = !irrigation;
          irrigationSocket();
        "
      >
        <v-icon color="blue darken-2" v-if="irrigation == true"
          >mdi-water-pump</v-icon
        >
        <v-icon v-if="irrigation == false">mdi-water-pump-off</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Bewaesserung',
  data: () => ({
    irrigation: false,
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
      this.$socket.client.emit('irrigation', this.irrigation);
    },
  },
};
</script>
