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
        <v-col cols="8" class="d-flex pl-4 pt-0 pb-0">
          <p class="subtitle-1  align-center d-flex ma-0">
            Automatik
          </p> </v-col
        ><v-col cols="4" class="pr-2 justify-end d-flex pt-0 pb-0">
          <v-switch v-model="light_auto"></v-switch>
        </v-col>
        <v-col class="pl-4 pt-0">
          <v-select
            label="Automatik Modus"
            v-if="light_auto"
            v-model="light_auto_mode"
            :items="light_auto_modes"
            flat
          ></v-select>
          <v-subheader v-if="(light_auto_mode == 'Zeitsteuerung') & light_auto"
            ><v-icon>mdi-information-outline</v-icon> Schaltet die Beleuchtung
            täglich zu den gewählten Zeitpunken ein- bzw aus.</v-subheader
          >
          <v-dialog
            ref="start_time_dialog"
            v-model="start_time_modal"
            :return-value.sync="start_time"
            persistent
            v-if="(light_auto_mode == 'Zeitsteuerung') & light_auto"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="start_time"
                label="Einschalt-Zeit"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              format="24hr"
              v-if="start_time_modal"
              v-model="start_time"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="start_time_modal = false"
                >Abbrechen</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.start_time_dialog.save(start_time)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>
          <v-dialog
            ref="end_time_dialog"
            v-model="end_time_modal"
            :return-value.sync="end_time"
            persistent
            v-if="(light_auto_mode == 'Zeitsteuerung') & light_auto"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="end_time"
                label="Ausschalt-Zeit"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              format="24hr"
              v-if="end_time_modal"
              v-model="end_time"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="end_time_modal = false"
                >Abbrechen</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.end_time_dialog.save(end_time)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>

          <!--           <v-expansion-panels v-if="light_auto" flat class="pa-0">
            <v-expansion-panel>
              <v-expansion-panel-header class="subtitle-1 pa-0 "
                >Automatik-Modus</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-select
                  v-model="light_auto_mode"
                  :items="light_auto_modes"
                  flat
                ></v-select>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels> -->
        </v-col>
      </v-row>
      <v-row v-if="light_auto">
        <v-col class="d-flex justify-end">
          <v-btn
            class="ma-2"
            :loading="save_button_loader"
            :disabled="save_button_loader"
            color="primary"
            @click="loader = 'save_button_loader'"
          >
            Speichern
          </v-btn>
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
    light_auto_mode: 'Zeit- und Helligkeitssteuerung',
    light_auto_modes: [
      'Zeitsteuerung',
      'Helligkeitssteuerung',
      'Zeit- und Helligkeitssteuerung',
    ],
    start_time: null,
    start_time_modal: false,
    end_time: null,
    end_time_modal: false,
    loader: null,
    save_button_loader: null,
  }),
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
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
