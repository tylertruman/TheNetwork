<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center mt-3">
      <form @submit.prevent="getPostsBySearch()">
        <label name="Search Bar"></label>
        <input type="text" v-model="query" placeholder="Search Posts...">
        <button type="submit" class="btn btn-primary mx-3 p-1">Search</button>
      </form>
      </div>
    </div>
  </div>
  <section class="container">
    <div class="row">
      <div class="col-8 offset-2 my-4" v-for="p in searchPosts" :key="p.id">
        <PostCard :post="p"/>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row text-center mb-4">
      <div class="col-6">
        <button class="btn btn-info" @click="changePage(previousPage)" :disabled="!previousPage">Previous</button>
      </div>
      <div class="col-6">
        <button class="btn btn-info px-4" @click="changePage(nextPage)" :disabled="!nextPage">Next</button>
      </div>
    </div>

  </section>
</template>

<script>
import { computed } from '@vue/reactivity';
import { ref } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
setup() {
  let query = ref('')

  return {
    query,
    searchPosts: computed(() => AppState.searchPosts),
    
    async getPostsBySearch(){
      try {
        await postsService.getPostsBySearch(query.value)
      } catch (error) {
        logger.error('[Getting Posts By Search]', error)
        Pop.error(error)
      }
    }
  };
},
};
</script>

<style>

</style>