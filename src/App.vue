<template>
  <header>
    <Navbar />
    <AdBanner/>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by Tyler Truman
    </div>
  </footer>
  <!-- NOTE MODAL -->
<div class="modal fade" id="createPostModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
        <form @submit.prevent="createPost()">
          <div class="modal-body">
            <div class="form-group">
              <label for="image">Image</label>
              <input type="text" class="form-control" id="imgUrl" placeholder="insert image here" v-model="imgUrl">
            </div>
            <div class="form-group">
              <label for="body">Body</label>
              <textarea class="form-control" id="body" rows="3" v-model="body"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
    </div>
  </div>
</div>
</template>

<script>
import { computed, onMounted} from 'vue';
import { AppState } from './AppState';
import AdBanner from './components/AdBanner.vue';
import { adsService } from './services/AdsService';
import { postsService } from './services/PostsService';
import { logger } from './utils/Logger';
import Pop from './utils/Pop';

export default {
    name: "App",
    setup() {
      
      async function getAds(){
        try {
          await adsService.getAds()
        } catch (error) {
          logger.error('Getting Ads', error)
          Pop.error(error)
        }
      }

      onMounted(() => {
        getAds()
      })
        return {
          // editable,
            appState: computed(() => AppState),
            ads: computed(() => AppState.ads),

            async createPost(){
        try {
          let form = window.event.target
          let newPost = {
            body: form.body.value,
            imgUrl: form.imgUrl.value
          }
            await postsService.createPost(newPost)
            Pop.success('Post Created!')
          form.reset()
        } catch (error) {
            logger.error('[Creating Post]', error)
            Pop.error('You must be logged in to create posts.', error)
        }
    }
        };
    },
    components: { AdBanner }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
