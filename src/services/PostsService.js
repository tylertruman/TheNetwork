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
        const res = await server.post('api/posts', postData)
        AppState.posts.unshift(new Post(res.data))
    }

    async deletePost(postId){
        const res = await server.delete(`api/posts/${postId}`)
        AppState.posts = AppState.posts.filter(p => p.id != postId)
    }
}

export const postsService = new PostsService()