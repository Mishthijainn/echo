import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

/**
 * Auto-provision widget settings for a new organization
 * This is called automatically when an organization is created
 */
export const provision = internalMutation({
    args: {
        organizationId: v.string(),
    },
    handler: async (ctx, args) => {
        // Check if widget settings already exist
        const existing = await ctx.db
            .query("widgetSettings")
            .withIndex("by_organization_id", (q) =>
                q.eq("organizationId", args.organizationId)
            )
            .unique();

        if (existing) {
            // Already provisioned, skip
            return;
        }

        // Create default widget settings
        await ctx.db.insert("widgetSettings", {
            organizationId: args.organizationId,
            greetMessage: "Hi! How can I help you today?",
            defaultSuggestions: {
                suggestion1: "How do I get started?",
                suggestion2: "What are your pricing plans?",
                suggestion3: "I need help with my account",
            },
            vapiSettings: {
                assistantId: "",
                phoneNumber: "",
            },
        });
    },
});

