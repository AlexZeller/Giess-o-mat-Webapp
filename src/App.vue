<template>
  <v-app>
    <v-app-bar app color="primary" height="60%" clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      clipped
      color="grey lighten-4"
      app
      fixed
    >
      <v-list nav>
        <v-list-item-group
          active-class="light-green darken-1--text text--accent-4"
        >
          <v-list-item @click="drawer = false" :to="{ path: '/' }">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false" :to="{ path: '/zeitreihen' }">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Zeitreihen</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false" :to="{ path: '/beleuchtung' }">
            <v-list-item-icon>
              <v-icon>mdi-lightbulb</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Beleuchtung</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false" :to="{ path: '/bewaesserung' }">
            <v-list-item-icon>
              <v-icon>mdi-sprinkler-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Bewässerung</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false" :to="{ path: '/ventilation' }">
            <v-list-item-icon>
              <v-icon>mdi-fan</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Ventilation</v-list-item-title>
          </v-list-item>
          <v-list-item @click="drawer = false" :to="{ path: '/einstellungen' }">
            <v-list-item-icon>
              <v-icon>mdi-cogs</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Einstellungen</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-content class="ma-2">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    drawer: null,
  }),
};
</script>
