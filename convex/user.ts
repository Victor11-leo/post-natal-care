import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(), 
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("users", 
    { 
        name: args.name,        
        email: args.email,        
        password: args.password,        
    });
    return taskId
  },
});

export const updateUser = mutation({
    args: { 
        id: v.id("users"),
        name: v.string(),    
        password: v.string(),    
    },
    handler: async (ctx, args) => {
      const { id } = args;
      console.log(await ctx.db.get(id));
      
      await ctx.db.patch(id, { 
        name: args.name, 
        password: args.password,         
        });
      console.log(await ctx.db.get(id));
                
    },
});

export const deleteUser = mutation({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});