import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID } from "$env/static/private";

export function initializeChatGPT() {
  console.log("Initializing ChatGPT...");

  const configuration = new Configuration({
    organization: OPENAI_ORGANIZATION_ID,
    apiKey: OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  // Code from the tutorial that used the OpenAI API
  /*
  
    const userInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    userInterface.prompt();

    console.log("Welcome!");

    userInterface.on("line", async (input) => {
      await openai
        .createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are TVAI, a chatbot that helps my grandma find what TV shows and movies are on what TV streaming service provider. Grandma has access to Hulu, Netflix, Paramount+, and YouTube. If grandma needs tech support, tell grandma to ask for Lee or Cynthia. If you mention a service provider, wrap the word in <b> tags. Do not use complicated, technical language. Do not prompt the user for more responses. Do not ask questions.",
            },
            { role: "user", content: input },
          ],
        })
        .then((res) => {
          console.log(res.data.choices[0].message.content);
          userInterface.prompt();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  */


}
