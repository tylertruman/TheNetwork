<template>
<div class="post-card card elevation-1">
    <div class="card-body">
        <div class="card-title">
            <img class="post-img" :src="post.imgUrl">
        </div>
        <div class="">
            <i>"{{post.body}}"</i>
            <p class="text-center mt-3"><button @click="likePost(post)" class="btn btn-primary">Like</button> Likes: {{post.likeIds.length}} </p>
            <div class="text-center" v-if="post.creator.id == account.id">
                <button class="btn btn-danger mb-3" @click="deletePost(post)">Delete</button>
            </div>
            <div>
            <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <img class="profile-img selectable rounded-circle" :src="post.creator.picture">
            </router-link>
            <span class="text-center mx-2">{{post.creator.name}}</span>
            <span class="">- {{new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric'
            })}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    props: {
        post: { type: Object, required: true}
    },
setup(props) {

  return {
    account: computed(() => AppState.account),

    async deletePost(post){
        try {
            if(post.creator.id !== AppState.account.id){
                throw new Error('You must be the creator of this post to delete it.')
            }
            const yes = await Pop.confirm('Delete The Post?')
            if(!yes) {return}
            await postsService.deletePost(post.id)
        } catch (error) {
            logger.error('[Deleting Post]', error)
            Pop.error(error)
        }
    },

    async likePost(post){
        try {
            if(!AppState.account){
                throw new Error('You must be logged in to like posts')
            }
            await postsService.likePost(post.id)
        } catch (error) {
            logger.error('[Liking Post]', error)
            Pop.error('You must be logged in to like posts.',error)
        }
    }

  };
},
};
</script>

<style>
.post-img {
    width: 100%;
    max-height: 400px;
}

.profile-img {
    width: 40px;
    height: 40px;
}
</style>