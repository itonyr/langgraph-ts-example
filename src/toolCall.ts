import { AIMessage, ToolMessage } from "@langchain/core/messages";
import { toolsByName } from "./tools";
import { MessagesState } from "./state";

export async function toolNode(state: typeof MessagesState.State) {
  const lastMessage = state.messages[state.messages.length - 1];

  if (lastMessage == null || !(lastMessage instanceof AIMessage)) {
    return { messages: [] };
  }

  const result: ToolMessage[] = [];
  for (const toolCall of lastMessage.tool_calls ?? []) {
    const tool = toolsByName[toolCall.name];
    const observation = await tool.invoke(toolCall);
    result.push(observation);
  }

  return { messages: result };
}
