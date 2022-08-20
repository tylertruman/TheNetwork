import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { logger } from "../utils/Logger";
import { server } from "./AxiosService.js";


class PostsService {
    async getPosts(){
        const res = await server.get('api/posts')
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async changePage(url) {
        const res = await server.get(url)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
    }

    async getPostsByCreatorId(creatorId){
        const res = await server.get('api/posts', {
            params: {
                creatorId
            }
        })
        logger.log(res.data)
        AppState.profilePosts = res.data.posts

    }

    async createPost(postData){
        if(!AppState.account){
            throw new Error('You must be signed in to create a post!')
        }
        const res = await server.post('api/posts', postData)
        AppState.posts.unshift(new Post(res.data))
    }

    async deletePost(postId){
        const res = await server.delete(`api/posts/${postId}`)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }

    async likePost(postId){
        const res = await server.put(`api/posts/${postId}`, AppState.account.id)
        // const index = AppState.posts.findIndex(p => p.id == projectData.id)
        // AppState.posts.splice(index, 1, new Post(res.data))
    }
}

export const postsService = new PostsService()