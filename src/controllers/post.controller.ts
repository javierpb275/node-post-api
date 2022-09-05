import { Response } from "express";
import { connect } from "../db/mysql.connection";
import { paginator } from "../helpers/pagination.helper";
import { validateObjectProperties } from "../helpers/validation.helper";
import { CRequest } from "../middlewares/auth.middleware";
import { PostModel } from "../models/post.model";

export default class PostController {
  public static async createPost(
    req: CRequest,
    res: Response
  ): Promise<Response> {
    const { user_id, body } = req;
    const newPost: PostModel = body;
    const isValid: boolean = validateObjectProperties(newPost, [
      "description",
      "title",
      "post_image",
    ]);
    if (!isValid) {
      return res.status(400).send({
        error: true,
        data: { message: "Invalid Properties." },
      });
    }
    newPost.user_id = user_id;
    try {
      const conn = await connect();
      await conn.query(`INSERT INTO posts SET ?`, [newPost]);
      return res.status(201).send({
        error: false,
        data: {
          message: "Post created successfully.",
          post: newPost,
        },
      });
    } catch (err) {
      return res.status(400).send({
        error: true,
        data: { message: "Error creating post.", error: err },
      });
    }
  }
  public static async getMyPostById(
    req: CRequest,
    res: Response
  ): Promise<Response> {
    const { params, user_id } = req;
    try {
      const conn = await connect();
      const response: any[] = await conn.query(
        `SELECT * FROM posts WHERE user_id = ? AND post_id = ?`,
        [user_id, params.id]
      );
      const posts: PostModel[] = response[0];
      if (!posts.length) {
        return res
          .status(404)
          .send({ error: true, data: { message: "Post Not Found." } });
      }
      return res.status(200).send({
        error: false,
        data: {
          message: "Post found successfully.",
          post: posts[0],
        },
      });
    } catch (err) {
      return res.status(500).send({
        error: true,
        data: { message: "Unable to get post.", error: err },
      });
    }
  }
  public static async getMyPosts(
    req: CRequest,
    res: Response
  ): Promise<Response> {
    const { user_id } = req;
    try {
      const conn = await connect();
      const response: any[] = await conn.query(
        `SELECT * FROM posts WHERE user_id = ?`,
        [user_id]
      );
      const posts: PostModel[] = response[0];
      let message: string;
      if (!posts.length) {
        message = "No posts found.";
      } else {
        message = `Found ${posts.length} posts`;
      }
      return res.status(200).send({
        error: false,
        data: {
          message,
          posts: posts,
        },
      });
    } catch (err) {
      return res.status(500).send({
        error: true,
        data: { message: "Unable to get posts.", error: err },
      });
    }
  }
  public static async updatePost(
    req: CRequest,
    res: Response
  ): Promise<Response> {
    const { body, user_id, params } = req;
    const updatedPost: PostModel = body;
    const isValid: boolean = validateObjectProperties(updatedPost, [
      "description",
      "title",
      "post_image",
    ]);
    if (!isValid) {
      return res.status(400).send({
        error: true,
        data: { message: "Invalid Properties." },
      });
    }
    try {
      const conn = await connect();
      await conn.query(`UPDATE posts set ? WHERE user_id = ? AND post_id = ?`, [
        updatedPost,
        user_id,
        params.id,
      ]);
      return res.status(200).send({
        error: false,
        data: {
          message: "Post updated successfully.",
          post: updatedPost,
        },
      });
    } catch (err) {
      return res.status(400).send({
        error: true,
        data: { message: "Unable to update post.", error: err },
      });
    }
  }
  public static async deletePost(
    req: CRequest,
    res: Response
  ): Promise<Response> {
    const { user_id, params } = req;
    try {
      const conn = await connect();
      await conn.query(`DELETE FROM posts WHERE user_id = ? AND post_id = ?`, [
        user_id,
        params.id,
      ]);
      return res.status(200).send({
        error: false,
        data: {
          message: "Post deleted successfully",
          post: {
            user_id,
            post_id: params.id,
          },
        },
      });
    } catch (err) {
      return res.status(500).send({
        error: true,
        data: { message: "Unable to delete post.", error: err },
      });
    }
  }
  public static async getPostById(
    req: CRequest,
    res: Response
  ): Promise<Response> {
    const { params } = req;
    try {
      const conn = await connect();
      const response: any[] = await conn.query(
        `SELECT * FROM posts WHERE post_id = ?`,
        [params.id]
      );
      const posts: PostModel[] = response[0];
      if (!posts.length) {
        return res
          .status(404)
          .send({ error: true, data: { message: "Post Not Found." } });
      }
      return res.status(200).send({
        error: false,
        data: {
          message: "Post found successfully.",
          post: posts[0],
        },
      });
    } catch (err) {
      return res.status(500).send({
        error: true,
        data: { message: "Unable to get post.", error: err },
      });
    }
  }
  public static async getPosts(
    req: CRequest,
    res: Response
  ): Promise<Response> {
    try {
      const conn = await connect();
      const response: any[] = await conn.query(
        `SELECT * FROM posts` + paginator(req.query)
      );
      const posts: PostModel[] = response[0];
      let message: string;
      if (!posts.length) {
        message = "No posts found.";
      } else {
        message = `Found ${posts.length} posts`;
      }
      return res.status(200).send({
        error: false,
        data: {
          message,
          posts: posts,
        },
      });
    } catch (err) {
      return res.status(500).send({
        error: true,
        data: { message: "Unable to get posts.", error: err },
      });
    }
  }
}
