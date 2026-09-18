import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    source: {
      type: String,
    },

    audioUrl: {
      type: String,
    },
    audioDuration: {
      type: Number,
    },
    duration: {
      type: String,
    },
    readTime: {
      type: String,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add text indexing for search
newsSchema.index({ title: 'text', summary: 'text', source: 'text' });

const News = mongoose.model("News", newsSchema);

export default News;
