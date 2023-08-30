import { Router } from "express";
import UserController from "./controller/UserController.js";
import PostController from "./controller/PostController.js";
import AuthController from "./controller/AuthController.js";
import { AuthMiddlwares} from "./middlewares/auth.js";

const router = Router()

router.post('/user', UserController.createUser)
router.get('/users', AuthMiddlwares, UserController.findAllUsers)
router.get('/user/:id', UserController.findUser)
router.put('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)


router.post('/post/user/:id', PostController.createPost)
router.get('/posts', PostController.findAllPosts)
router.put('/post/:id', PostController.updatePost)


router.post('/auth', AuthController.authenticate)

export { router }