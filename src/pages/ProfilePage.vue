<template>
  <div class="profile-page text-center" v-if="profile">
    <img class="cover-img" :src="profile.coverImg" height=200>
    <h1>{{ profile.name }}</h1>
    <img class="rounded profile-img" :src="profile.picture" alt="" />
    <p>Bio: {{profile.bio}}</p>
    <p>Class of {{profile.class}}</p>
    <p>Graduated: {{profile.graduated ? "Yes" : "No"}}</p>
    <a :href="profile.github">GitHub</a>
    <br>
    <a :href="profile.linkedin">LinkedIn</a>
    <br>
    <a :href="profile.resume">Resume</a>
    <div class="container">
      <div class="row">
        <div class="col-8 offset-2 my-4" v-for="p in posts" :key="p.id">
          <PostCard :post="p"/>
        </div>
      </div>
      <div class="row text-center mb-4">
      <div class="col-6">
        <button class="btn btn-info" @click="changePageProfile(previousPageProfile)" :disabled="!previousPageProfile">Previous</button>
      </div>
      <div class="col-6">
        <button class="btn btn-info px-4" @click="changePageProfile(nextPageProfile)" :disabled="!nextPageProfile">Next</button>
      </div>
    </div>
    </div>
  </div>
  <div v-else>
    Loading Profile...
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { router } from '../router';
import { postsService } from '../services/PostsService';
import { profilesService } from '../services/ProfilesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
setup() {

  const route = useRoute()

  async function getPostsByCreatorId(){
    try {
      await postsService.getPostsByCreatorId(route.params.profileId)
    } catch (error) {
      logger.error('Getting Profile Posts', error)
      Pop.error(error)
    }
  }

  async function getProfileById(){
    try {
      await profilesService.getProfileById(route.params.profileId)
    } catch (error) {
      logger.error('Getting Profile', error)
      Pop.error(error)
      router.push({ name: 'Home' })
    }
  }

  onMounted(() => {
    getPostsByCreatorId()
    getProfileById()
  })

  return {
    account: computed(() => AppState.account),
    profile: computed(() => AppState.activeProfile),
    posts: computed(() => AppState.profilePosts),
    nextPageProfile: computed(() => AppState.nextPageProfile),
    previousPageProfile: computed(() => AppState.previousPageProfile),

    async changePageProfile(url) {
        try {
          await postsService.changePageProfile(url)
        } catch (error) {
          logger.error('Changing Page', error)
          Pop.error(error)
        }
      }
  }
}
}
</script>

<style>
.profile-img {
  width: 100px;
  height: 100px;
}

.cover-img {
  width: 100%;
  background-position: center;
  object-fit: cover;
}
</style>