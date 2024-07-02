<!-- About.vue -->
<template>
  <v-container fluid>
    <v-row class="d-flex justify-center">
      <v-col cols="5">
        <h3>Feature Ideas Request</h3>
        <p>Help us build the smartest web app</p>
      </v-col>
      <v-col cols="2">
        <v-btn class="pa-6" color="blue-accent-4" @click="(dialogAddIdea = true)">
          <p style="margin-top: -10px;"><v-icon>mdi-plus</v-icon> Submit Idea</p>
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center mt-10" >
      <v-col cols="7">
        <div v-for="item in allFR" :key="item._id" class="preOpenDeatil mt-10">
          <v-row>
            <v-col cols="1">
              <v-btn variant="outlined" @click="(addScore(item))" >{{ item.Score_vote }}</v-btn>
            </v-col>
            <v-col cols="6">
              <div  @click="(dialogOpenDetail = true , openDetail(item))">
                <v-col cols="8" class="pl-10">
                  <h4>{{ item.Title_Subject }}</h4>
                  <p class="truncate">{{ item.Detail_Request }}</p>
                </v-col>
              </div>
            </v-col>
            <v-col cols="5">
              <p>Create Date : {{ item.Date }}</p>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <!-- Dialog Idea -->
  <v-dialog v-model="dialogAddIdea" width="600">
    <v-card class="rounded-lg">
      <v-container>
        <v-row>
          <v-col cols="5">
            <h4>Tell us your idea</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Subject Feature"
              id="id"
              hide-details=true
              v-model="subjectFeature"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col> 
            <v-textarea
              label="Share us for Idea"
              textarea
              hide-details=true
              v-model="ideaDetail"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h4>Choose type for request feature</h4>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              :items="dataFieldSelect"
              v-model="categoryFeature"
              label="label"
              hide-details=true
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-col cols="5" class="d-flex justify-end">
            <v-btn class="px-5 py-5" color="blue-accent-4" @click="(dialogAddIdea = false , addFeature())"> <p style="margin-top: -10px;">Submit Idea</p></v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>

  <!-- Dialog Open Detail -->
  <v-dialog
    v-model="dialogOpenDetail"
    width="600"
    height="450"
  >
    <v-card height="400">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-btn :disabled="true" variant="outlined"><p>{{this.scoreDetail}}</p></v-btn>
          </v-col>
          <v-col cols="10">
            <h4>{{  this.subjectDetail }}</h4>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-col  cols="10">
            <p> {{ this.detailFeature }}</p>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-end">
          <v-col  cols="10">
            <p> {{ this.createDate }}</p>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import apiService from "@/api/appService";
import Homepage from "./Home.vue";

export default {
  name: 'About',
  mixins: [Homepage],

  data () {
    return {
      dataList : [
        {
          score : 0 , 
          dataTitle : 'Dark Mode And Light Mode manually irrespective of the system theme',
          dataDetail : 'Hello Please add the ability to change "Dark Mode and Light Mode" manually.The lack of such option is very annoying.Best!',
          createDate : '20/03/0224',
        },
        {
          score : 12, 
          dataTitle : 'Create new email',
          dataDetail : 'I love email',
          createDate : '21/03/0224',
        }
      ],
      dataFieldSelect : [ "UX / UI" , "Data" , "System Usage" , "Other"],
      dialogAddIdea : false,
      dialogOpenDetail : false,

      allFR : [],
      subjectFeature: '',
      ideaDetail : '',
      categoryFeature : '',
    }
  },
  async created() { 
    await this.getAllFR()
  },
  methods : {
    openDetail (item) {
      this.scoreDetail = item.Score_vote
      this.subjectDetail = item.Title_Subject
      this.detailFeature = item.Detail_Request
      this.createDate = item.createDate
    },
    async addScore (item) {
        const response = await apiService.getFineScore({ id_card : item.id_card });
        const idForCard = response.data[0].id_card
        const tempScore = response.data[0].Score_vote
        console.log(response)
        const responseAddScore = await apiService.addScore(
          {
            Id_feature : idForCard,
            Score_vote : tempScore + 1
          }
        );
        console.log(responseAddScore);
        item.Score_vote = item.Score_vote + 1;
    },
    async getAllFR (){
      try {
        let dataAll = await apiService.getPosts();
        this.allFR = dataAll.data;
      } catch (error) {
        console.log(error)
      }
    },
    async addFeature () {
      try {
        let id_card_generate = this.generateRandomString(24);
        const now = new Date();
        let date = this.formatDate(now)

        const data = {
          id_Idea : id_card_generate,
          requestBy : "pawarut",
          requestDate : date,
          statusConsider : "New Feature",
          categoryFeature : this.categoryFeature,
          detailFeature : this.ideaDetail,
          subjectFeature : this.subjectFeature,
          scoreVote : 0,
          Date : date
        }
        const response = await apiService.addFeature(data);
        console.log(response);
      } catch (error) {
        console.log(error)
      }
    },
    generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },

// // Usage example
// const randomString = generateRandomString(24); // Generate a 24-character random string
// console.log(randomString);

  }
};
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