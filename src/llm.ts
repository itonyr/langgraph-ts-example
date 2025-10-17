import { SystemMessage } from "@langchain/core/messages";
import { ChatAnthropic } from "@langchain/anthropic";
import { tools } from "./tools";
import { MessagesState } from "./state";

const llm = new ChatAnthropic({
  model: "claude-sonnet-4-5-20250929",
  temperature: 0,
});

const llmWithTools = llm.bindTools(tools);

export async function llmCall(state: typeof MessagesState.State) {
  return {
    messages: await llmWithTools.invoke([
      new SystemMessage(
        "You are a helpful assistant tasked with performing arithmetic on a set of inputs."
      ),
      ...state.messages,
    ]),
    llmCalls: (state.llmCalls ?? 0) + 1,
  };
}
