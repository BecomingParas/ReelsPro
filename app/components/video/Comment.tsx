"use client";
import { useState } from "react";
import { X, Heart, Send, MoreHorizontal } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useAuth } from "@/app/context/AuthContext";
import { cn } from "@/app/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Comment {
  id: string;
  user: {
    name: string;
    username: string;
    avatar?: string;
  };
  text: string;
  likes: number;
  time: string;
  replies?: Comment[];
}

interface CommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: { name: "राम बहादुर", username: "ram_bahadur" },
    text: "यो भिडियो धेरै राम्रो छ! 🔥",
    likes: 234,
    time: "2 घण्टा",
    replies: [
      {
        id: "1-1",
        user: { name: "सीता देवी", username: "sita_devi" },
        text: "@ram_bahadur धन्यवाद! 🙏",
        likes: 12,
        time: "1 घण्टा",
      },
    ],
  },
  {
    id: "2",
    user: { name: "कृष्ण प्रसाद", username: "krishna_pd" },
    text: "नेपाल को सुन्दरता 🇳🇵❤️",
    likes: 456,
    time: "5 घण्टा",
  },
  {
    id: "3",
    user: { name: "गीता कुमारी", username: "geeta_k" },
    text: "कति राम्रो! कहाँ हो यो ठाउँ?",
    likes: 89,
    time: "8 घण्टा",
  },
  {
    id: "4",
    user: { name: "हरि माया", username: "hari_maya" },
    text: "👏👏👏 अद्भुत!",
    likes: 167,
    time: "12 घण्टा",
  },
  {
    id: "5",
    user: { name: "विष्णु प्रसाद", username: "vishnu_p" },
    text: "यस्तो content चाहिन्छ नेपाली reels मा 💯",
    likes: 321,
    time: "1 दिन",
  },
];

export default function CommentSheet({ isOpen, onClose }: CommentSheetProps) {
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState(mockComments);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  const handleLikeComment = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !isAuthenticated) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: user?.fullName || "User",
        username: user?.username || "user",
      },
      text: commentText,
      likes: 0,
      time: "अहिले",
    };

    setLocalComments([newComment, ...localComments]);
    setCommentText("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[70vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-bold">
            {t("comments")} ({localComments.length})
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {localComments.map((comment) => (
            <div key={comment.id} className="animate-fade-in">
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-sm font-bold shrink-0">
                  {comment.user.name[0]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      @{comment.user.username}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {comment.time}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{comment.text}</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4 transition-all",
                          likedComments.has(comment.id) &&
                            "text-primary fill-primary scale-110"
                        )}
                      />
                      {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                      {t("reply")}
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-border space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold shrink-0">
                            {reply.user.name[0]}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-semibold text-xs">
                                @{reply.user.username}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {reply.time}
                              </span>
                            </div>
                            <p className="text-xs">{reply.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-sm font-bold shrink-0">
              {isAuthenticated ? user?.fullName?.[0] || "U" : "?"}
            </div>
            <div className="flex-1 relative">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  isAuthenticated ? t("addComment") : "Login to comment..."
                }
                disabled={!isAuthenticated}
                className="pr-12 h-11 rounded-full bg-muted/50 border-border/50 focus:border-primary/50"
                onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
              />
              <Button
                size="icon"
                onClick={handleAddComment}
                disabled={!commentText.trim() || !isAuthenticated}
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full gradient-bg hover:opacity-90 disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
