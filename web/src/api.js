import axios from 'axios'

const http = axios.create({
  baseURL: (process.env.REACT_APP_API_URL || '') + '/api'
});

export const api = {
  getCourses: async () => (await http.get('/courses')).data,
  getCourse: async (courseId) => (await http.get(`/courses/${courseId}`)).data,
  getQuestion: async (questionId) => (await http.get(`/questions/${questionId}`)).data,
  checkAnswer: async (questionId, answer) => (await http.post(`/questions/${questionId}/answer`, answer)).data,
};
