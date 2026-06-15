import React, { useState, useEffect } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { motion } from "framer-motion";

interface Comment {
  id: string;
  projectId: number;
  author: string;
  text: string;
  date: string;
}

interface ProjectCommentsProps {
  projectId: number;
}

const ProjectComments: React.FC<ProjectCommentsProps> = ({ projectId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const storedComments = localStorage.getItem(
      `project_comments_${projectId}`,
    );
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [projectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      projectId,
      author: authorName.trim() || "Anonymous Visitor",
      text: newComment.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(
      `project_comments_${projectId}`,
      JSON.stringify(updatedComments),
    );
    setNewComment("");
  };

  return (
    <div className="mt-16 pt-12 border-t border-white/5">
      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <MessageSquare className="text-primary" />
        Comments ({comments.length})
      </h3>

      <div className="space-y-6 mb-12">
        {comments.length === 0 ? (
          <p className="text-gray-500 italic bg-black/20 p-6 rounded-2xl border border-white/5 text-center">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={comment.id}
              className="bg-slate-900/40 p-6 rounded-2xl border border-white/5 flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <User size={20} />
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <h4 className="text-white font-bold">{comment.author}</h4>
                  <span className="text-xs text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {comment.text}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900/60 p-6 md:p-8 rounded-3xl border border-white/10"
      >
        <h4 className="text-white font-bold mb-6">Leave a Comment</h4>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label
              htmlFor="authorName"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Name (Optional)
            </label>
            <input
              type="text"
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-sans"
              placeholder="How should we address you?"
            />
          </div>
          <div>
            <label
              htmlFor="newComment"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Message
            </label>
            <textarea
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-y font-sans"
              placeholder="What do you think about this project?"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={!newComment.trim()}
          className="px-6 py-3 bg-primary hover:bg-yellow-400 text-dark font-bold rounded-xl flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          Post Comment
          <Send
            size={18}
            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
          />
        </button>
      </form>
    </div>
  );
};

export default ProjectComments;
