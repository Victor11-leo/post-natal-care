import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),    
    image: v.string(),     
  }),
  subPosts: defineTable({
    title: v.string(),
    body: v.string(),
    posts: v.optional(v.id("posts"))
  }).index("by_post",['posts']),
  tags: defineTable({
    name: v.string(),    
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(), 
    password: v.string(),    
  }).index("by_email", ["email"]),
});