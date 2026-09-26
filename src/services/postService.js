// src/services/postService.js
import postRepository from "../repositories/postRepository.js";
import userRepository from "../repositories/userRepository.js";

class PostService {
    async createPost(userId, postData) {
        const user = await userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");

        const hashtags = this.#parseHashtags(postData.hashtags);

        return await postRepository.create({ ...postData, hashtags, user: user._id });
    }

    async getPosts() {
        return await postRepository.findAll();
    }

    async getPostById(postId) {
        const post = await postRepository.findById(postId);
        if (!post) throw new Error("Post no encontrado");
        return post;
    }

    async updatePost(postId, postData) {
        const hashtags = this.#parseHashtags(postData.hashtags);
        return await postRepository.update(postId, { ...postData, hashtags });
    }

    async deletePost(postId) {
        return await postRepository.delete(postId);
    }

    #parseHashtags(hashtags) {
        if (Array.isArray(hashtags)) return hashtags;
        if (typeof hashtags === "string" && hashtags.trim() !== "") {
            return hashtags.split(",").map((h) => h.trim()).filter(Boolean);
        }
        return [];
    }
}

export default new PostService();