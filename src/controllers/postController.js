import postService from "../services/postService.js";
import userRepository from "../repositories/userRepository.js";

class PostController {
    async getAll(req, res) {
        try {
            const posts = await postService.getPosts();
            res.render("posts", { posts });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async newForm(req, res) {
        try {
            const users = await userRepository.findAll();
            res.render("post-form", { post: null, users, action: "/posts" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { userId, ...postData } = req.body;
            await postService.createPost(userId, postData);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editForm(req, res) {
        try {
            const { id } = req.params;
            const post = await postService.getPostById(id);
            const users = await userRepository.findAll();
            res.render("post-form", { post, users, action: `/posts/${id}` });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { userId, ...postData } = req.body;
            if (userId) postData.user = userId;
            await postService.updatePost(id, postData);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await postService.deletePost(id);
            res.redirect("/posts");
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

export default new PostController();