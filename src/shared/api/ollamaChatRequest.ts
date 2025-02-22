import { type Message } from "@/store/useSessionsStore";
import { type ChatResponse } from "ollama/browser";

const ollamaChatRequest = async (
  server: string,
  payload: Message[],
  model: string,
  onChunk: (value: string) => void,
  signal: AbortSignal,
) => {
  const response = await fetch(`${server}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "text/event-stream" },
    body: JSON.stringify({
      model,
      messages: payload,
      stream: true,
    }),
    signal,
  });

  if (!response.body) return;

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;
    if (!value) continue;

    const chunks = value.split("\n").filter((line) => line);

    for (const chunk of chunks) {
      const { message } = JSON.parse(chunk) as ChatResponse;

      onChunk(message.content);
    }
  }
};

export default ollamaChatRequest;
