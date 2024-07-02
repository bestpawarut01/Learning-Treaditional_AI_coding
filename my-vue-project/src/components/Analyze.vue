<template>
  <v-container>
    <v-row>
      <div style="width: 800px;height: 500px;">
        <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
        />
      </div>
    </v-row>
    <v-row>
      <v-col>
        <div >
          <Pie
            id="my-pie"
            :options="chartOptions"
            :data="PieData"
          />
        </div>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-btn @click="printPage"> Print page</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale ,ArcElement} from 'chart.js'
import apiService from "@/api/appService";
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,ArcElement)

export default {
  name: 'Analyze',
  components: { Bar ,Pie},
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#A2D9D9' ,'#73C5C5' ,'#009596' ,'#005F60','#003737' ,'#F4B678' ,'#EF9234','#EC7A08','#C46100','#8F4700']
          }
        ]
      },
      PieData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ['#519DE9', '#7CC674' ,'#73C5C5' , '#8481DD' , '#F6D173', '#EF9234' , '#A30000' ,'#D2D2D2' ,'#004B95'],
          }
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  created() {
    this.getAllAnalyze();
    this.getAllFeatures();
  },
  methods: {
    printPage (){
      window.print();
    },
    async getAllFeatures(){
      try{
        const response = await apiService.getPosts();
        this.transformDataFeature(response.data)
      } catch (e) {
        console.log(e);
      }
    },
    async getAllAnalyze() {
      try {
        const response = await apiService.getAllAnalyze();
        this.transformData(response.data);
      } catch (e) {
        console.log(e);
      }
    },
    transformData(data) {
      const labels = data.map(item => item.ModuleBug);
      const amounts = data.map(item => item.Amount);
      
      this.chartData = {
        labels,
        datasets: [
          {
            data: amounts
          }
        ]
      };
    },
    transformDataFeature(data) {
      const labels = data.map(item => item.Title_Subject);
      const scores = data.map(item => item.Score_vote);
      
      this.PieData = {
        labels,
        datasets: [
          {
            data: scores
          }
        ]
      };
    }
  }
}
</script>