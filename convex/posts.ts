import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    title: v.string(),    
    image: v.string(),    
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("posts", 
    { 
        title: args.title,
        image: args.image,
    });
    return taskId
  },
});

export const getPostById = query({
  args: {
    id: v.id("posts")  
},
  handler: async (ctx, args) => {    
    const tasks = await ctx.db.get(args.id);    
    return tasks
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx, args) => {    
    const tasks = await ctx.db.query("posts").collect();
    console.log(tasks);
    return tasks
  },
});



export const updatePost = mutation({
    args: { 
        id: v.id("posts"),
        title: v.string(),    
        image: v.string(),    
    },
    handler: async (ctx, args) => {
      const { id } = args;
      console.log(await ctx.db.get(id));
      
      await ctx.db.patch(id, { 
        title: args.title, 
        image: args.image 
        });
      console.log(await ctx.db.get(id));
                
    },
});

export const deletePost = mutation({
    args: { id: v.id("posts") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});