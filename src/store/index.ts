import { Post, Author } from '@/models/postsInterface';
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[] | null>(null);
  const authors = ref<Author[] | null>(null);
  const getPosts = computed(() => posts.value);
  const getAuthors = computed(() => authors.value);

  function postsRequest() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => posts.value = json);
  }

  function authorsRequest() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => authors.value = json);
  }

  return { postsRequest, authorsRequest, getPosts, getAuthors }
})
