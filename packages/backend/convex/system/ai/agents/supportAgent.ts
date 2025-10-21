import { google } from '@ai-sdk/google';
import { Agent } from "@convex-dev/agent";
import {  components } from "../../../_generated/api";

export const supportAgent = new Agent(components.agent, {
  name: "support-agent",
  chat: google("models/gemini-1.5-pro"),
  instructions: `You are a customer support agent. Use "resolveConversation" tool when user expresses finalization of the conversation. Use "escalateConversation" tool when user expresses frustation, or requests a human explicitly. `,
  
});
