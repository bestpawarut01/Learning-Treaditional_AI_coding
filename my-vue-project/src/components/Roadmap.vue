<template>
  <v-container class="mx-0">
    <v-icon >mdi-arrow-left</v-icon>
    <v-row class="mt-8">

      <!-- card up consideration -->
      <v-col cols="4">
        <v-card height="1100" class="border-sm">
          <v-row >
            <v-col cols="1">
              <v-icon color="#007AC1" class="ma-2">mdi-circle-outline</v-icon>
            </v-col>
            <v-col>
              <h4 class="ma-2"> Up Consideration </h4>
            </v-col>
          </v-row>
          <v-row v-for="item in dataUpConsideration" :key="item._id" class="ma-2 preOpenDeatil">
            <v-col cols="2">
              <v-btn :disabled="true" variant="outlined"> {{ item.Score_vote }}</v-btn>
            </v-col>
            <v-col cols="6" class="pl-6">
              <h4> {{ item.Title_Subject }}</h4>
              <p class="truncate"> {{ item.Detail_Request }} </p>
            </v-col>
            <v-col cols="4">
              <p style="color: #007AC1;"> {{ item.Status_Consideration }} </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- card In Develop -->
      <v-col cols="4">
        <v-card height="1100" class="border-sm">
          <v-row>
            <v-col cols="1">
              <v-icon color="#FAB515" class="ma-2">mdi-circle-outline</v-icon>
            </v-col>
            <v-col>
              <h4 class="ma-2"> In Develop </h4>
            </v-col>
          </v-row>

          <v-row v-for="item in dataInDevelop" :key="item._id" class="ma-2 preOpenDeatil">
            <v-col cols="2">
              <v-btn :disabled="true" variant="outlined"> {{ item.Score_vote }}</v-btn>
            </v-col>
            <v-col cols="6"  class="pl-6">
              <h4> {{ item.Title_Subject }}</h4>
              <p class="truncate"> {{ item.Detail_Request }} </p>
            </v-col>
            <v-col cols="4">
              <p style="color: #FAB515;"> {{ item.Status_Consideration }} </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <!-- card Shipped -->
      <v-col cols="4">
        <v-card height="1100" class="border-sm">
          <v-row>
            <v-col cols="1">
              <v-icon color="#17DB4E" class="ma-2">mdi-circle-outline</v-icon>
            </v-col>
            <v-col>
              <h4 class="ma-2"> Shipped </h4>
            </v-col>
          </v-row>

          <v-row v-for="item in dataShipped" :key="item._id" class="ma-2 preOpenDeatil">
            <v-col cols="2">
              <v-btn :disabled="true" variant="outlined"> {{ item.Score_vote }}</v-btn>
            </v-col>
            <v-col cols="6"  class="pl-6">
              <h4> {{ item.Title_Subject }}</h4>
              <p class="truncate"> {{ item.Detail_Request }} </p>
            </v-col>
            <v-col cols="4">
              <p style="color: #17DB4E;"> {{ item.Status_Consideration }} </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import apiService from "@/api/appService";

  export default {
    name : 'roadmap',

    data () {
      return {
        dataUpConsideration : [],

        dataInDevelop : [],

        dataShipped : [],
      }
    },
    async created () {
      await this.getUpConsideraion();
      await this.getInDevelop();
      await this.getShipped();
    },
    methods : {
      
      async getUpConsideraion () {
        try {
          const result = await apiService.getUpConsideration();
          this.dataUpConsideration = result.data;
        } catch (error) {
          console.log(error)
        }
      },

      async getInDevelop () {
        try {
          const result = await apiService.getInDevelop();
          this.dataInDevelop = result.data;
        } catch (error) {
          console.log(error)
        }
      },

      async getShipped () {
        try {
          const result = await apiService.getShipped();
          this.dataShipped = result.data;
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>
<style>
.preOpenDeatil:hover {
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
  cursor: pointer;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>