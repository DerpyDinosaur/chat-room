import * as v from "valibot";
import { query, form } from "$app/server";

const messages: {id: number, text: string, sender: string}[] = [];
const listeners = new Set();
let id = 1;

export const get_messages = query.live(async function* () {
  while (true) {
    yield messages;
    const { promise, resolve } = Promise.withResolvers();
    listeners.add(resolve);
    await promise;
  }
});

export const send_message = form(
  v.object({
    text: v.pipe(v.string(), v.minLength(1), v.maxLength(1000)),
    sender: v.pipe(v.string(), v.minLength(1))
  }),
  async ({ sender, text }) => {
    messages.push({ id: id++, sender, text });
    for (const listener of listeners) listener();
    listeners.clear();
  },
);
