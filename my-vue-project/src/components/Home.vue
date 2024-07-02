<template>
  <div class="body">
    <v-container fluid>
      <v-row no-gutters class="d-flex justify-center mt-10">
        <v-col cols="5" class="bg-white pa-9 rounded-xl">
          <v-row>
            <v-col class="d-flex justify-center">
              <h2>Report Bug / แจ้งปัญหากาารใช้งาน</h2>
            </v-col>
          </v-row>
          <form>
            <v-row>
              <v-col>
                <p>Report by :</p>
                <v-text-field
                  type="email"
                  label="Input email"
                  v-model="email"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <p>Module Found :</p>
                <v-select
                  :items="itemSelect"
                  label="Choose an module bug"
                  v-model="selectModule"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <p>Detail Bug :</p>
                <v-textarea
                  label="Input bug detail"
                  v-model="detail"
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <p>Upload bug image :</p>
                <v-file-input
                  label="Select file to upload"
                  multiple
                  prepend-icon=""
                  v-model="files"
                  @change="handleFileChange"
                ></v-file-input>
              </v-col>
            </v-row>

            <v-row>
              <v-col class="d-flex justify-center">
                <v-btn type="submit" class="px-7" color="blue-accent-4" @click="(addBug)">Send Report</v-btn>
              </v-col>
            </v-row>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import appService from '@/api/appService';

export default {
  name: 'Home',
  data() {
    return {
      itemSelect: [
        "Dashboard",
        "Documents",
        "DSAR",
        "Consent",
        "Integration",
        "PDPA report",
        "Rop",
        "User Management",
        "Other",
      ],
      email: '',
      detail: '',
      files: [],
      selectModule: '',
      formattedDate : '',
      listfielUpload : [],
    };
  },
  methods: {
    // Function to format date
    formatDate(date) {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayOfWeek = daysOfWeek[date.getDay()];

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const year = String(date.getFullYear()).slice(-2); // Get last two digits of year

      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'
      return `${dayOfWeek}, ${day}/${month}/${year}, ${hours}:${minutes} ${ampm}`;
      
    },
    async addBug() {
      // Get the current date and time
      const now = new Date();
      this.formattedDate = this.formatDate(now);
      try {
        const rowData = {
          reportBy : this.email,
          bugModule : this.selectModule,
          bugDetail : this.detail,
          uploadFile : this.listfielUpload,
          timeReport : this.formattedDate
        }
        const response = await appService.addBug(rowData);
        console.log(response);
      }
      catch (error) {
        console.log(error);
      }
    },
    handleFileChange() {
      if (this.files && this.files.length > 0) {
        this.files.forEach(file => {
          console.log('File:', file);
          this.listfielUpload.push(file.name);
          // If you need to read the file content
          const reader = new FileReader();
          reader.readAsText(file);
          // reader.readAsDataURL(file); // Use this for images, etc.
        });
      } else {
        console.log('No files selected');
      }
    }
  }
};
</script>

<style>
.body {
  background-image: url('../assets/background.jpg');
  background-size: cover;
  height: 100vh;
}
</style>
