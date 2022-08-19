<template>
<div class="post-card card">
    <div class="card-body">
        <div class="card-title">
            <img class="post-img" :src="post.imgUrl">
        </div>
        <div class="card-body">
            <p>{{post.body}}</p>
            <p>Likes: {{post.likeIds.length}}</p>
            <p>{{post.createdAt}}</p>
            <router-link :to="{ name: 'Profile', params: { profileId: post.creator.id } }">
            <img class="profile-img selectable" :src="post.creator.picture">
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
import { Post } from '../models/Post.js';

export default {
    props: {
        post: { type: Object, required: true}
    },
setup(props) {

  return {
    account: computed(() => AppState.account),

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