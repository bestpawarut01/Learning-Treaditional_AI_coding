import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getPosts() {
    return apiClient.get('/posts');
  },
  getUpConsideration() {
    return apiClient.get('/UpCosideration');
  },
  getInDevelop() {
    return apiClient.get('/InDevelop');
  },
  getShipped() {
    return apiClient.get('/Shipped');
  },
  addBug(data) {
    return apiClient.post('/addBug' ,data);
  },
  addFeature(data) {
    return apiClient.post('/addFeatureRequest' ,data);
  },
  addScore(score) {
    return apiClient.post('/addScores' , score);
  },
  getFineScore(id) {
    return apiClient.post('/findIdAddScore' , {id});
  },
  getAllAnalyze(){
    return apiClient.get('/getAllAnalyze')
  }
};
