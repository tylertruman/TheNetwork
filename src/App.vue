<template>
  <header>
    <Navbar />
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
    <AdBanner/>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by Tyler Truman
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </footer>
  <!-- NOTE MODAL -->




  <div id="" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit="createPost()">
        <div class="form-group">
          <label for="exampleFormControlInput1">Image</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="insert image here">
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Body</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        
        </form>
      
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Submit</button>
      </div>
      
    </div>
  </div>
</div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import AdBanner from './components/AdBanner.vue';
import { adsService } from './services/AdsService';
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
            appState: computed(() => AppState),
            ads: computed(() => AppState.ads)
        };
    },
    components: { AdBanner }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
