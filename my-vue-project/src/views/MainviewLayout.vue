<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <img src="../assets/RagnarIcon.png" alt="Ragnar-icon">
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-for="item in items" :key="item.title" @click="$router.push(item.route)">
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Report Bug', route: '/' },
        { title: 'Feature Request', route: '/about' },
        { title: 'Roadmap' , route: 'roadmap'},
        { title: 'Analyze' , route: 'analyze'}
      ],
      groups: [
        { title: 'Analytics', route:''},
        { title: 'Homepage', route:''}
      ]
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>