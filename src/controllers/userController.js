import userRepository from "../repositories/userRepository.js";

class UserController {
    async newForm(req, res) {
        res.render("user-form", { error: null });
    }

    async create(req, res) {
        try {
            await userRepository.create(req.body);
            res.redirect("/posts/new");
        } catch (error) {
            res.render("user-form", { error: error.message });
        }
    }
}

export default new UserController();