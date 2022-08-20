<template>
    <form class="account-form" @submit.prevent="handleSubmit">
    <div class="container">
        <section class="row">
        <div class="col-md-6">
            <label for="name">Name:</label>
            <input type="text" class="form-control" v-model="editable.name" required name="name">
        </div>
        <div class="col-md-6">
            <label for="picture">Profile Picture:</label>
            <input type="url" class="form-control" v-model="editable.picture" required name="picture" placeholder="picture">
        </div>
        <div class="col-md-6">
            <label for="coverImg">Cover Photo:</label>
            <input type="url" class="form-control" v-model="editable.coverImg" required name="coverImg">
        </div>
        <div class="col-md-6">
            <label for="bio">Bio:</label>
            <textarea type="text" class="form-control" v-model="editable.bio" required name="bio" rows="8" style="resize:none"></textarea>
        </div>
        <div class="col-md-6">
            <label for="github">GitHub:</label>
            <input type="text" class="form-control" v-model="editable.github" required name="github">
        </div>
        <div class="col-md-6">
            <label for="linkedin">LinkedIn:</label>
            <input type="text" class="form-control" v-model="editable.linkedin" required name="linkedin">
        </div>
        <div class="col-md-6">
            <label for="resume">Resume:</label>
            <input type="text" class="form-control" v-model="editable.resume" required name="resume">
        </div>
        <div class="col-md-6">
            <label for="class">Class:</label>
            <input type="text" class="form-control" v-model="editable.class" required name="class">
        </div>
        <div class="col-md-6">
            <label for="graduated">Graduated: True or False</label>
            <input type="text" class="form-control" v-model="editable.graduated" required name="graduated">
        </div>
        <div class="col-12 text-center">
            <button class="btn btn-primary">Submit</button>
        </div>
    </section>
    </div>
    </form>
</template>

<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { router } from '../router';
import { accountService } from '../services/AccountService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
setup() {
    const editable = ref({})

    watchEffect(() => {
        if(!AppState.account) {return}
        editable.value = {...AppState.account}
    })

  return {
    editable,

    async handleSubmit(){
        try {
            await accountService.editAccount(editable.value)
            router.push({ name: 'Profile', params: { profileId: editable.value.id }})
        } catch (error) {
            logger.error('[Editing Account]', error)
            Pop.error(error)
        }
    }
  };
},
};
</script>

<style>

</style>