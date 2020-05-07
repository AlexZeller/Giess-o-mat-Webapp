<template>
  <div>
    <v-container fluid>
      <v-btn
        @click.stop="
          light = !light;
          lightSocket();
        "
      >
        <v-icon v-if="light == false">mdi-lightbulb-off</v-icon>
        <v-icon color="yellow accent-3" v-if="light == true"
          >mdi-lightbulb</v-icon
        >
      </v-btn>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Beleuchtung',
  data: () => ({
    light: false,
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
    lightSocket() {
      this.$socket.client.emit('light', this.light);
    },
  },
};
</script>
