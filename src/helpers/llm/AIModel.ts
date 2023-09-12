import { OpenAIChat } from "langchain/llms/openai";
import { retryAsync } from "ts-retry";

interface IAIModel {
  modelName: string;
  temperature: number;
  apiKey: string;
  retryCount?: number;
  organization: string | undefined;
}

const defaultRetryCount = 3;

class AIModel {
  private model: OpenAIChat;
  private retryCount: number;

  constructor(options: IAIModel) {
    this.model = new OpenAIChat({
      openAIApiKey: options.apiKey,
      modelName: options.modelName,
      temperature: options.temperature,
      configuration: { organization: options.organization },
    });
    this.retryCount = options.retryCount || defaultRetryCount;
  }

  public async callModel(prompt: string): Promise<string> {
    return this.model.call(prompt);
  }

  public async callModelJSON<T>(prompt: string): Promise<T> {
    return retryAsync(
      async () => {
        const modelResponse = await this.callModel(prompt);
        console.debug(`Model response: ${modelResponse}`);
        try {
          return JSON.parse(modelResponse) as T;
        } catch (error) {
          console.error(
            `Error parsing JSON response from the model: ${modelResponse}`,
            error
          );
          throw error;
        }
      },
      {
        maxTry: this.retryCount,
        onError: (error: any) => {
          console.error(`Error in callModelJSON`, error);
        },
        onMaxRetryFunc: () => {
          throw new Error(
            `Couldn't call model after ${this.retryCount} tries with prompt: ${prompt}`
          );
        },
      }
    );
  }
}

export default AIModel;
