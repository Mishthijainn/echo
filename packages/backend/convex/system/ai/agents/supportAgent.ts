import { google } from '@ai-sdk/google';
import { Agent } from "@convex-dev/agent";
import {  components } from "../../../_generated/api";
import { SUPPORT_AGENT_PROMPT } from '../constants';

export const supportAgent = new Agent(components.agent, {
  name: "support-agent",
  chat: google("models/gemini-1.5-pro"),
  instructions: SUPPORT_AGENT_PROMPT,
  
});
