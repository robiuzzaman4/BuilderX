import { Schema, model, models } from "mongoose";
import { TPlatform } from "@/types/platform";

const componentInstanceSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Component type is required"],
    },
    componentId: {
      type: String,
      required: [true, "Component ID is required"],
    },
    order: {
      type: Number,
      required: [true, "Component order is required"],
    },
    props: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: false,
  }
);

const platformSchema = new Schema<TPlatform>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Platform name is required"],
      trim: true,
    },
    slug: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    pageStructure: {
      type: [componentInstanceSchema],
      default: [],
    },
    thumbnail: {
      type: String,
      default: null,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    metadata: {
      title: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

// === create unique sparse index for non-empty slugs ===
platformSchema.index(
  { slug: 1 },
  {
    unique: true,
    sparse: true, // only index documents where slug exists and is not empty
    partialFilterExpression: { slug: { $ne: "" } },
  }
);

// === set publishedAt date when isPublished changes to true ===
platformSchema.pre("save", function (next) {
  if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

export const Platform =
  models.Platform || model<TPlatform>("Platform", platformSchema);
