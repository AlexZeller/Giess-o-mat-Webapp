<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <p class="text-center font-weight-bold subtitle-1">
          Einstellungen - Bewässerung
        </p>
      </v-row>
      <v-row>
        <v-col class="pl-4 pt-0">
          <v-select
            label="Automatik Modus"
            v-model="irrigation_mode"
            :items="irrigation_modes"
            flat
          ></v-select>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-0">
              <v-subheader
                class="pa-0 pb-2 caption"
                v-if="irrigation_mode == 'Zeitsteuerung'"
                ><v-icon small class="pr-2">mdi-information-outline</v-icon>
                Schaltet die Bewässerung zu den augewählten Zeiten und
                Parametern ein.</v-subheader
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-2">
              <v-subheader
                class="pa-0 pb-2 mb-4 caption"
                v-if="irrigation_mode == 'Bodenfeuchtesteuerung'"
                ><v-icon small class="pr-2">mdi-information-outline</v-icon>
                Schaltet die Bewässerung ein, sobald die Bodenfeuchte den
                Schwellwert unterschreitet. Max.3 pro Tag.</v-subheader
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-0">
              <v-subheader
                class="pa-0 pb-2 mb-4 caption"
                v-if="irrigation_mode == 'Zeit- und Bodenfeuchtesteuerung'"
                ><v-icon small class="pr-2">mdi-information-outline</v-icon>
                Prüft zu den gewählten Zeitpunken die Bodenfeuchte und schaltet
                die Bewässerung ein, sollte die Bodenfeuchte unter dem
                Schwellwert liegen.</v-subheader
              >
            </v-col>
          </v-row>
          <v-select
            prepend-icon="mdi-water-percent"
            label="Schwellwert Bodenfeuchte"
            v-if="
              irrigation_mode == 'Zeit- und Bodenfeuchtesteuerung' ||
                irrigation_mode == 'Bodenfeuchtesteuerung'
            "
            v-model="humidity_threshold"
            :items="humidity_thresholds"
            flat
          ></v-select>
          <v-select
            prepend-icon="mdi-counter"
            label="Interval Bewässerung in Tagen"
            v-if="
              irrigation_mode != 'Manuell' &&
                irrigation_mode != 'Bodenfeuchtesteuerung'
            "
            v-model="irrigation_interval"
            :items="irrigation_interval_list"
            flat
          ></v-select>
          <v-select
            prepend-icon="mdi-format-list-numbered"
            label="Anzahl Bewässerungen"
            v-if="
              irrigation_mode != 'Manuell' &&
                irrigation_mode != 'Bodenfeuchtesteuerung' &&
                irrigation_interval == 1
            "
            v-model="irrigation_number_of_times"
            :items="irrigation_number_of_times_list"
            flat
          ></v-select>
          <v-select
            prepend-icon="mdi-timer"
            label="Dauer Bewässerungen [s]"
            v-if="irrigation_mode != 'Manuell'"
            v-model="irrigation_duration"
            :items="irrigation_duration_list"
            flat
          ></v-select>

          <v-dialog
            ref="irrigation_time_1_dialog"
            v-if="
              irrigation_mode != 'Manuell' &&
                irrigation_mode != 'Bodenfeuchtesteuerung'
            "
            v-model="irrigation_time_1_modal"
            :return-value.sync="irrigation_time_1"
            persistent
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="irrigation_time_1"
                label="Zeitpunkt Bewässerung"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              format="24hr"
              v-if="irrigation_time_1_modal"
              v-model="irrigation_time_1"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="irrigation_time_1_modal = false"
                >Abbrechen</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.irrigation_time_1_dialog.save(irrigation_time_1)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>
          <v-dialog
            ref="irrigation_time_2_dialog"
            v-if="
              (irrigation_number_of_times == 2 ||
                irrigation_number_of_times == 3) &&
                irrigation_mode != 'Manuell' &&
                irrigation_interval == 1
            "
            v-model="irrigation_time_2_modal"
            :return-value.sync="irrigation_time_2"
            persistent
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="irrigation_time_2"
                label="Zeitpunkt 2. Bewässerung"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              format="24hr"
              v-if="irrigation_time_2_modal"
              v-model="irrigation_time_2"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="irrigation_time_2_modal = false"
                >Abbrechen</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.irrigation_time_2_dialog.save(irrigation_time_2)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>

          <v-dialog
            ref="irrigation_time_3_dialog"
            v-if="
              irrigation_number_of_times == 3 &&
                irrigation_mode != 'Manuell' &&
                irrigation_interval == 1
            "
            v-model="irrigation_time_3_modal"
            :return-value.sync="irrigation_time_3"
            persistent
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="irrigation_time_3"
                label="Zeitpunkt 3. Bewässerung"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              format="24hr"
              v-if="irrigation_time_3_modal"
              v-model="irrigation_time_3"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="irrigation_time_3_modal = false"
                >Abbrechen</v-btn
              >
              <v-btn
                text
                color="primary"
                @click="$refs.irrigation_time_3_dialog.save(irrigation_time_3)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>
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
  name: 'BewaesserungEinstellungen',
  data: () => ({
    irrigation_mode: 'Zeit- und Bodenfeuchtesteuerung',
    irrigation_modes: [
      'Manuell',
      'Zeitsteuerung',
      'Bodenfeuchtesteuerung',
      'Zeit- und Bodenfeuchtesteuerung',
    ],
    irrigation_number_of_times: 1,
    irrigation_number_of_times_list: [1, 2, 3],
    irrigation_interval: 1,
    irrigation_interval_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    irrigation_duration: 10,
    irrigation_duration_list: [5, 10, 20, 30, 40, 50, 60, 120, 240, 360, 480],
    irrigation_time_1: null,
    irrigation_time_1_modal: false,
    irrigation_time_2: null,
    irrigation_time_2_modal: false,
    irrigation_time_3: null,
    irrigation_time_3_modal: false,
    humidity_threshold: 40,
    humidity_thresholds: [
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
    ],
    save_button_loader: false,
    dialog: false,
    save_success: 'success',
  }),
  methods: {
    constructJSON() {
      var ventilation_setttings = {
        mode: this.irrigation_mode,
        interval: this.irrigation_interval,
        number_irrigations: this.irrigation_number_of_times,
        duration_irrigation: this.irrigation_duration,
        irrigation_time_1: this.irrigation_time_1,
        irrigation_time_2: this.irrigation_time_2,
        irrigation_time_3: this.irrigation_time_3,
        humidity_threshold: this.humidity_threshold,
      };
      return JSON.stringify(ventilation_setttings);
    },
    sendSettings() {
      this.save_button_loader = true;
      axios
        .post(
          process.env.VUE_APP_ROOT_API + '/settings/irrigation',
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
};
</script>
