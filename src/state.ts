import { Annotation } from "@langchain/langgraph";
import { messagesStateReducer } from "@langchain/langgraph";
import { type BaseMessage } from "@langchain/core/messages";

export const MessagesState = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: messagesStateReducer,
    default: () => [],
  }),
  llmCalls: Annotation<number>({
    reducer: (_, y) => y,
    default: () => 0,
  }),
});
