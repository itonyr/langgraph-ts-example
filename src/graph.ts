import { StateGraph, START, END } from "@langchain/langgraph";
import { llmCall } from "./llm";
import { toolNode } from "./toolCall";
import { shouldContinue } from "./shouldContinue";
import { MessagesState } from "./state";

export const agent = new StateGraph(MessagesState)
  .addNode("llmCall", llmCall)
  .addNode("toolNode", toolNode)
  .addEdge(START, "llmCall")
  .addConditionalEdges("llmCall", shouldContinue, ["toolNode", END])
  .addEdge("toolNode", "llmCall")
  .compile();

// Invoke
// import { HumanMessage } from "@langchain/core/messages";
// const result = await agent.invoke({
//   messages: [new HumanMessage("Add 3 and 4.")],
// });

// for (const message of result.messages) {
//   console.log(`[${message.type}]: ${message.text}`);
// }
