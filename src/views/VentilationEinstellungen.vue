<template>
  <div>
    <v-container fluid>
      <v-row justify="center">
        <p class="text-center font-weight-bold subtitle-1">
          Einstellungen - Ventilation
        </p>
      </v-row>
      <v-row>
        <v-col class="pl-4 pt-0">
          <v-select
            label="Automatik Modus"
            v-model="ventilation_mode"
            :items="ventilation_modes"
            flat
          ></v-select>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-0">
              <v-subheader
                class="pa-0 pb-2 caption"
                v-if="ventilation_mode == 'Lufttemperatursteuerung'"
                ><v-icon small class="pr-2">mdi-information-outline</v-icon>
                Schaltet die Belüftung ein, sobald die Lufttemperatur den
                gesetzten Wert überschreitet.</v-subheader
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-0">
              <v-subheader
                class="pa-0 pb-2 caption"
                v-if="ventilation_mode == 'Luftfeuchtesteuerung'"
                ><v-icon small class="pr-2">mdi-information-outline</v-icon>
                Schaltet die Belüftung ein, sobald die Luftfeuchte den gesetzten
                Wert überschreitet.</v-subheader
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex pl-4 pt-0 pb-0">
              <v-subheader
                class="pa-0 pb-2 mt-4 mb-4 caption"
                v-if="
                  ventilation_mode == 'Lufttemperatur- und Luftfeuchtesteuerung'
                "
                ><v-icon small class="pr-2">mdi-information-outline</v-icon>
                Schaltet die Belüftung ein, sobald die Luftfeuchte oder die
                Lufttemperatur den gesetzten Wert überschreitet.</v-subheader
              >
            </v-col>
          </v-row>
          <v-select
            prepend-icon="mdi-thermometer"
            label="Schwellenwert Lufttemperatur [°C]"
            v-if="
              ventilation_mode == 'Lufttemperatur- und Luftfeuchtesteuerung' ||
                ventilation_mode == 'Lufttemperatursteuerung'
            "
            v-model="ta_threshold"
            :items="ta_thresholds"
            flat
          ></v-select>
          <v-select
            prepend-icon="mdi-waves"
            label="Schwellenwert Luftfeuchte [%]"
            v-if="
              ventilation_mode == 'Lufttemperatur- und Luftfeuchtesteuerung' ||
                ventilation_mode == 'Luftfeuchtesteuerung'
            "
            v-model="rh_threshold"
            :items="rh_thresholds"
            flat
          ></v-select>
          <v-row v-if="ventilation_mode != 'Manuell'">
            <v-col cols="8" class="d-flex pl-4 pt-0 pb-0">
              <p class="subtitle-1  align-center d-flex ma-0">
                Nachtruhe
              </p> </v-col
            ><v-col cols="4" class="pr-2 justify-end d-flex pt-0 pb-0">
              <v-switch v-model="mode_ventilation_stop"></v-switch>
            </v-col>
          </v-row>

          <v-dialog
            ref="start_time_dialog"
            v-if="mode_ventilation_stop && ventilation_mode != 'Manuell'"
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
            v-if="mode_ventilation_stop && ventilation_mode != 'Manuell'"
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

export default {
  name: 'VentilationEinstellungen',
  data: () => ({
    ventilation_mode: 'Lufttemperatur- und Luftfeuchtesteuerung',
    ventilation_modes: [
      'Manuell',
      'Lufttemperatursteuerung',
      'Luftfeuchtesteuerung',
      'Lufttemperatur- und Luftfeuchtesteuerung',
    ],
    mode_ventilation_stop: true,
    start_time: null,
    start_time_modal: false,
    end_time: null,
    end_time_modal: false,
    ta_threshold: 5000,
    rh_threshold: 5000,
    ta_thresholds: [
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33,
      34,
      35,
      36,
      37,
      38,
      39,
      40,
    ],
    rh_thresholds: [
      0,
      5,
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
      95,
      100,
    ],
    save_button_loader: false,
    dialog: false,
    save_success: 'success',
  }),
};
</script>
