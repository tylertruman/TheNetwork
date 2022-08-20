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
        if(!AppState.account){
            throw new Error('You must be the creator of this post to delete it!')
        }
        const res = await server.delete(`api/posts/${postId}`)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }

    async likePost(postId){
        if(!AppState.account){
            throw new Error('You must be signed in to like posts!')
        }
        const res = await server.post(`api/posts/${postId}/like`)
        // let post = AppState.posts.find(p => p.id == postId)
        const index = AppState.posts.findIndex(p => p.id == postId)
        AppState.posts.splice(index, 1, new Post(res.data))
    }

    async getPostsBySearch(query){
        const res = await server.get('api/posts', {
            params: {
                query
            }
        })
        AppState.searchPosts = res.data.posts
    }
}

export const postsService = new PostsService()