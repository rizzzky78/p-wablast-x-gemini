import { Content } from "@google/generative-ai";
import { Collection } from "mongodb";

type User = {
  id: string;
  tagname: string;
  timestamp: Date;
  countchats: number;
  chats: Content[];
};

type Router = {
  user: Collection<User>;
};
