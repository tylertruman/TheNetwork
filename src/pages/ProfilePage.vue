<template>
  <div class="profile-page text-center" v-if="profile">
    <img class="cover-img" :src="profile.coverImg" height=200>
    <h1>{{ profile.name }}</h1>
    <img class="rounded profile-img" :src="profile.picture" alt="" />
    <p>Bio: {{profile.bio}}</p>
    <p>GitHub: {{profile.github}}</p>
    <p>LinkedIn: {{profile.linkedin}}</p>
    <p>Resume: {{profile.resume}}</p>
    <p>Class of: {{profile.class}}</p>
    <p>Graduated: {{profile.graduated ? "Yes" : "No"}}</p>

    <div class="container">
      <div class="row">
        <div class="col-8 offset-2 my-4" v-for="p in posts" :key="p.id">
          <PostCard :post="p"/>
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
    posts: computed(() => AppState.profilePosts)
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