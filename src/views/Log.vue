<template>
  <div>
    <v-container fluid>
      <v-data-table
        :headers="headers"
        :items="log_data"
        :items-per-page="5"
        class="elevation-1"
        disable-filtering
        disable-sort
        dense
        hide-default-header
        v-if="this.log_data != ''"
      >
        <template v-slot:item.level="{ item }">
          <v-chip :color="getColor(item.level)" dark>{{ item.level }}</v-chip>
        </template>
      </v-data-table>
      <h4 v-if="this.log_data == ''">Could not reach API Server</h4>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'Log',
  data() {
    return {
        log_data: '',
         headers: [
          {
            text: 'Uhrzeit',
            align: 'start',
            value: 'timestamp'
          },
          { text: 'Thema', value: 'topic' },
          { text: 'Level', value: 'level' },
          { text: 'Nachricht', value: 'message' }
        ],
    };
  },

  
  methods: {
      getColor (level) {
        if (level == 'info') return 'blue-grey lighten-4'
        else if (level == 'action' ) return 'green'
        else if (level == 'success' ) return 'light-green'
        else if (level == 'error' ) return 'red'
      },

  },
  created() {

  },
  mounted() {
    axios
      .get(process.env.VUE_APP_ROOT_API + '/log')
      .then((response) => (this.log_data = response.data))
      .catch(this.log_data = '');
  },
};
</script>
