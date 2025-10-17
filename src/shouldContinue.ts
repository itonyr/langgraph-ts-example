import { END } from "@langchain/langgraph";
import { AIMessage } from "@langchain/core/messages";
import { MessagesState } from "./state";

export async function shouldContinue(state: typeof MessagesState.State) {
  const lastMessage = state.messages[state.messages.length - 1];
  if (lastMessage == null || !(lastMessage instanceof AIMessage)) return END;

  // If the LLM makes a tool call, then perform an action
  if (lastMessage.tool_calls?.length) {
    return "toolNode";
  }

  // Otherwise, we stop (reply to the user)
  return END;
}
