<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <p class="text-center font-weight-bold title">Beleuchtung</p>
      </v-row>
      <v-row justify="center" class="pa-3">
        <v-btn
          x-large
          :disabled="light_auto"
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
      <v-row justify="center" class="pt-4">
        <p class="text-center font-weight-bold subtitle-1">Einstellungen</p>
      </v-row>
      <v-row>
        <v-col cols="8" class="d-flex">
          <p class="body-1  align-center d-flex ma-0">
            Automatik
          </p> </v-col
        ><v-col cols="4">
          <v-switch v-model="light_auto" :label="isAuto()"></v-switch>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Beleuchtung',
  data: () => ({
    light_status: false,
    light_mode: 'Manuell',
    light_auto: false,
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
      this.$socket.client.emit('light', this.light_status);
    },
    isAuto() {
      if (this.light_auto == false) {
        return 'Aus';
      } else {
        return 'An';
      }
    },
  },
};
</script>
