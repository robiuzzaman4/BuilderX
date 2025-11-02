import { TUser } from "@/types/user";

export type TComponentInstance = {
  _id?: string;
  type: string;
  componentId: string;
  order: number;
  props: Record<string, any>;
};

export type TPlatformMetadata = {
  title?: string;
  description?: string;
};

export type TPlatform = {
  _id: string;
  user: TUser;
  name: string;
  slug?: string;
  isPublished: boolean;
  pageStructure: TComponentInstance[];
  thumbnail?: string;
  publishedAt?: Date;
  metadata?: TPlatformMetadata;
  createdAt?: Date;
  updatedAt?: Date;
};
