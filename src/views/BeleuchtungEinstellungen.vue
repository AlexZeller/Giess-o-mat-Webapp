<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <p class="text-center font-weight-bold subtitle-1">
          Einstellungen - Beleuchtung
        </p>
      </v-row>
      <v-row>
        <v-col class="pl-4 pt-0">
          <v-select
            label="Automatik Modus"
            v-model="light_mode"
            :items="light_modes"
            flat
          ></v-select>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-0">
              <v-subheader
                class="pa-0 pb-2 caption"
                v-if="light_mode == 'Zeitsteuerung'"
                ><v-icon small class="pr-2">mdi-information-outline</v-icon>
                Schaltet die Beleuchtung täglich zu den gewählten Zeitpunken
                ein- bzw aus.</v-subheader
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-0">
              <v-subheader
                class="pa-0 pb-2 mt-4 mb-4 caption"
                v-if="light_mode == 'Zeit- und Helligkeitssteuerung'"
                ><v-icon small class="pr-2">mdi-information-outline</v-icon> In
                einem gewählten Zeitraum wird die Beleuchtung eingeschaltet,
                sobald die natürliche Beleuchtungsstärke unter einen
                festgelegten Schwellwert fällt.</v-subheader
              >
            </v-col>
          </v-row>
          <v-dialog
            ref="start_time_dialog"
            v-if="light_mode !== 'Manuell'"
            v-model="start_time_modal"
            :return-value.sync="start_time"
            persistent
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
            v-if="light_mode !== 'Manuell'"
            v-model="end_time_modal"
            :return-value.sync="end_time"
            persistent
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
          <v-select
            prepend-icon="mdi-white-balance-sunny"
            label="Minimale Beleuchtungsstärke [Lux]"
            v-if="light_mode == 'Zeit- und Helligkeitssteuerung'"
            v-model="lux_threshold"
            :items="lux_thresholds"
            flat
          ></v-select>

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
      <v-row>
        <v-col class="d-flex justify-end">
          <v-btn
            class="ma-2"
            :loading="save_button_loader"
            color="primary"
            @click="sendSettings()"
          >
            Speichern
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title v-if="this.save_success == 'success'" class="subtitle-2"
          >Ihre Einstellungen wurden erfolgreich übertragen.</v-card-title
        >
        <v-card-title
          v-if="this.save_success == 'server_failed'"
          class="subtitle-2"
          >Fehler beim Übertragen der Einstellungen (Interner Server
          Fehler).</v-card-title
        >
        <v-card-title v-if="this.save_success == 'failed'" class="subtitle-2"
          >Fehler beim Übertragen der Einstellungen
          (Verbindungsfehler)</v-card-title
        >

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'BeleuchtungEinstellungen',
  data: () => ({
    light_mode: 'Zeit- und Helligkeitssteuerung',
    light_modes: ['Manuell', 'Zeitsteuerung', 'Zeit- und Helligkeitssteuerung'],
    start_time: null,
    start_time_modal: false,
    end_time: null,
    end_time_modal: false,
    lux_threshold: 5000,
    lux_thresholds: [500, 1000, 2000, 3000, 4000, 5000],
    save_button_loader: false,
    dialog: false,
    save_success: 'success',
  }),
  methods: {
    constructJSON() {
      var light_setttings = {
        mode: this.light_mode,
        start_time: this.start_time,
        end_time: this.end_time,
        lux_threshold: this.lux_threshold,
      };
      return JSON.stringify(light_setttings);
    },
    sendSettings() {
      this.save_button_loader = true;
      axios
        .post(
          process.env.VUE_APP_ROOT_API + '/settings/light',
          this.constructJSON(),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            (this.save_button_loader = false),
              (this.dialog = true),
              (this.save_success = 'success');
          } else if (response.status == 500) {
            (this.save_button_loader = false),
              (this.dialog = true),
              (this.save_success = 'server_failed');
          }
        })
        .catch((error) => {
          console.log(error);
          (this.save_button_loader = false),
            (this.dialog = true),
            (this.save_success = 'failed');
        });
    },
  },
  created() {},
  mounted() {},
};
</script>
