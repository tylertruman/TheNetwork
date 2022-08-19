<template>
  <section class="container">
    <div class="row">
      <div class="col-8 offset-2 my-4" v-for="p in posts" :key="p.id">
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
import { onMounted } from 'vue';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
  setup(){
    async function getPosts(){
      try {
        await postsService.getPosts()
      } catch (error) {
        logger.error('Getting Posts', error)
        Pop.error(error)
      }
    }

    onMounted(() => {
      getPosts()
    })

    return {
      posts: computed(() => AppState.posts),
      nextPage: computed(() => AppState.nextPage),
      previousPage: computed(() => AppState.previousPage),

      async changePage(url) {
        try {
          await postsService.changePage(url)
        } catch (error) {
          logger.error('Changing Page', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
