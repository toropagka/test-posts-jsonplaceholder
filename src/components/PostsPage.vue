<template>
  <v-card class="title-card">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Filter by author..."
      single-line
      hide-details
      @input="handleSearchInput"
    />
  </v-card>
  <v-container>
    <v-card
      v-for="post in filteredPosts"
      class="posts-card"
      :key="post.id"
      variant="outlined"
    >
      <v-card-text><h2>{{ post.title }}</h2></v-card-text>
      <v-card-text>{{ post.body }}</v-card-text>
      <v-card-subtitle>{{ findAuthorById(post.userId)?.name }}</v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { usePostsStore } from '@/store/index';
import { Post, Author } from '@/models/postsInterface';

const store = usePostsStore();

const search = ref<string>('');
const posts = computed<Post[]>(() => store.getPosts || []);
const authors = computed<Author[]>(() => store.getAuthors || []);

const findAuthorById = (userId: number): Author | undefined => {
  return authors.value.find((author) => author.id === userId);
};

onMounted(async () => {
  await store.postsRequest();
  await store.authorsRequest();
});

const filteredPosts = computed<Post[]>(() => {
  const searchValue = search.value ? search.value.toLowerCase() : '';

  return posts.value && authors.value
    ? posts.value.filter((post) => {
        const author = findAuthorById(post.userId);
        return author && author.name && author.name.toLowerCase().includes(searchValue);
      })
    : [];
});

const handleSearchInput = (event: Event) => {
  const inputValue = (event.target as HTMLInputElement).value;
  search.value = inputValue;
};
</script>

<style scoped lang="scss">
.v-text-field {
  width: 500px;
  margin: 0 auto;
}

.v-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  .posts-card {
    max-width: 350px;
    border: 1px solid rgb(234, 221, 221);

    .v-card-text {
      &::first-letter {
        text-transform: uppercase;
      }

      h2 {
        color: rgb(75, 171, 240);
      }
    }
  }
}
</style>
