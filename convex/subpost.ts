import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSubPost = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    posts: v.id("posts")  
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("subPosts", 
    { 
        title: args.title,
        body: args.body,
        posts:args.posts
    });
    return taskId
  },
});

export const getSubPosts = query({
    args: {
        posts: v.id("posts")  
    },
    handler: async (ctx, args) => {    
      const tasks = await ctx.db
      .query("subPosts")
      .withIndex("by_post", (q) => q.eq("posts",args.posts))
      .collect();

      console.log(tasks);
      return tasks
    },
});

export const getSubPostsById = query({
    args: {
        id: v.id("subPosts")  
    },
    handler: async (ctx, args) => {    
      const tasks = await ctx.db.get(args.id)
      return tasks
    },
});

export const updateSubPost = mutation({
    args: { 
        id: v.id("subPosts"),
        title: v.string(),    
        body: v.string(),  
        posts: v.id("posts")    
    },
    handler: async (ctx, args) => {
      const { id } = args;
      console.log(await ctx.db.get(id));
      
      await ctx.db.patch(id, { 
        title: args.title, 
        body: args.body,
        posts: args.posts,
        });
      console.log(await ctx.db.get(id));
                
    },
});

export const deleteSubPost = mutation({
    args: { id: v.id("subPosts") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});