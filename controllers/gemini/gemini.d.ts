import { User } from "@database/router/schema";
import { Content } from "@google/generative-ai";

/**
 * @alias gemini-1.5-pro
 *
 * Input: Audio, images, videos, and text.
 *
 * Output: Text
 *
 * Optimized for: Complex reasoning tasks such as code and text generation, text editing, problem solving, data extraction and generation
 */
type GeminiPro = "gemini-1.5-pro";

/**
 * @alias gemini-1.5-pro
 *
 * Input: Audio, images, videos, and text.
 *
 * Output: Text
 *
 * Optimized for: Fast and versatile performance across a diverse variety of tasks
 */
type GeminiFlash = "gemini-1.5-flash";

type GeminiModel = GeminiPro | GeminiFlash;

type CreateUserDto = {
  id: string;
  tagname: string;
  timestamp: string;
  countchats: number;
  content: Content[];
};

type UpdateUserDto = {
  id: string;
  content: Content[];
};

type GenerativeChatDto = {
  user: {
    id: string;
    tagname: string;
    prompt: string;
  };
  inlineData: {
    img: Buffer | null;
    vid: Buffer | null;
    doc: Buffer | string | null;
  };
};
