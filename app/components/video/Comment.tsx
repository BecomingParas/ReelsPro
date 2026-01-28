"use client";
import { useState, useEffect } from "react";
import { X, Heart, Send, MoreHorizontal, MessageCircle, ThumbsUp, User, Sparkles, TrendingUp, Clock, Reply, Flag, Trash2, Edit, Check, XCircle } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useSession } from "next-auth/react";
import { cn } from "@/app/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Comment {
  id: string;
  user: {
    name: string;
    username: string;
    avatar?: string;
    verified?: boolean;
    isCreator?: boolean;
  };
  text: string;
  likes: number;
  time: string;
  isEdited?: boolean;
  isPinned?: boolean;
  replies?: Comment[];
}

interface CommentSheetProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    user: { 
      name: "राम बहादुर", 
      username: "ram_bahadur",
      verified: true,
      isCreator: true 
    },
    text: "यो भिडियो धेरै राम्रो छ! सुन्दर दृश्य र अद्भुत संगीत 🎬🎶",
    likes: 234,
    time: "2 घण्टा",
    isPinned: true,
    replies: [
      {
        id: "1-1",
        user: { name: "सीता देवी", username: "sita_devi", verified: true },
        text: "@ram_bahadur सहमत! संगीतले त मन्त्र मुग्ध बनाइदियो 🙏✨",
        likes: 45,
        time: "1 घण्टा",
      },
      {
        id: "1-2",
        user: { name: "विद्या गुरुङ", username: "vidya_g" },
        text: "धन्यवाद सर! तपाईंको समर्थनले प्रेरित गर्छ 🇳🇵❤️",
        likes: 28,
        time: "45 मिनेट",
        isEdited: true,
      },
    ],
  },
  {
    id: "2",
    user: { 
      name: "कृष्ण प्रसाद", 
      username: "krishna_pd",
      verified: true 
    },
    text: "नेपाली संस्कृति र प्राकृतिक सुन्दरताको अद्भुत संयोजन 🇳🇵❤️",
    likes: 456,
    time: "5 घण्टा",
    replies: [
      {
        id: "2-1",
        user: { name: "अन्जली शर्मा", username: "anjali_s" },
        text: "हाम्रो देशको गर्व! 🏔️",
        likes: 89,
        time: "3 घण्टा",
      },
    ],
  },
  {
    id: "3",
    user: { 
      name: "गीता कुमारी", 
      username: "geeta_k",
      isCreator: true 
    },
    text: "कति राम्रो! कृपया location share गर्नुहोस्, म पनि त्यहाँ जान चाहन्छु 🌄",
    likes: 189,
    time: "8 घण्टा",
  },
  {
    id: "4",
    user: { 
      name: "हरि माया", 
      username: "hari_maya",
      verified: true 
    },
    text: "Cinematography र editing बिल्कुल professional level को! 👏👏👏",
    likes: 312,
    time: "12 घण्टा",
    isEdited: true,
  },
  {
    id: "5",
    user: { 
      name: "विष्णु प्रसाद", 
      username: "vishnu_p" 
    },
    text: "यस्तो quality content चाहिन्छ नेपाली reels मा! Keep it up 💯🔥",
    likes: 567,
    time: "1 दिन",
  },
  {
    id: "6",
    user: { 
      name: "सुनिता राई", 
      username: "sunita_rai" 
    },
    text: "मैले यो भिडियो 10 पटक हेरिसके! Addicted भैसकेको छु 😅",
    likes: 123,
    time: "2 दिन",
  },
];

export default function CommentSheet({ isOpen, onClose, videoId }: CommentSheetProps) {
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState<Comment[]>(mockComments);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "top">("all");
  const { t } = useLanguage();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLikeComment = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
      // Decrease like count
      setLocalComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: Math.max(0, comment.likes - 1) }
          : comment
      ));
    } else {
      newLiked.add(commentId);
      // Increase like count
      setLocalComments(prev => prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ));
    }
    setLikedComments(newLiked);
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !isAuthenticated) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: session?.user?.name || "User",
        username: ((session?.user as any)?.username as string) || "user",
        verified: Math.random() > 0.7, // Random verification for demo
      },
      text: commentText,
      likes: 0,
      time: "अहिले",
    };

    setLocalComments([newComment, ...localComments]);
    setCommentText("");
    setReplyingTo(null);
  };

  const handleReply = (username: string) => {
    setReplyingTo(username);
    setCommentText(`@${username} `);
  };

  const handleEditComment = (commentId: string, currentText: string) => {
    setEditingComment(commentId);
    setEditText(currentText);
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editText.trim()) return;
    
    setLocalComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? { ...comment, text: editText, isEdited: true }
        : comment
    ));
    
    setEditingComment(null);
    setEditText("");
  };

  const handleDeleteComment = (commentId: string) => {
    setLocalComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const getTimeColor = (time: string) => {
    if (time.includes("अहिले") || time.includes("मिनेट") || time.includes("घण्टा")) {
      return "text-green-500";
    } else if (time.includes("दिन")) {
      const days = parseInt(time);
      return days <= 1 ? "text-yellow-500" : "text-gray-500";
    }
    return "text-gray-500";
  };

  const sortedComments = activeTab === "top" 
    ? [...localComments].sort((a, b) => b.likes - a.likes)
    : localComments;

  if (!isOpen) return null;

  return (
    <>
      {/* Animated Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:py-8">
        {/* Sheet */}
        <div 
          className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[75vh] bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-t-3xl sm:rounded-3xl border border-gray-800/50 shadow-2xl flex flex-col animate-slide-up sm:animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-t-3xl sm:rounded-t-3xl">
            <div className="bg-gradient-to-b from-gray-900 to-black rounded-t-2xl sm:rounded-t-2xl">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-600/20">
                        <MessageCircle className="w-6 h-6 text-pink-500" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                          Comments
                        </h2>
                        <p className="text-sm text-gray-400">
                          {localComments.length} comments • 1.2K replies
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-3 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50 transition-all duration-300 hover:scale-110"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeTab === "all"
                        ? "bg-gradient-to-r from-pink-500 to-purple-600"
                        : "bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50"
                    }`}
                  >
                    All Comments
                  </button>
                  <button
                    onClick={() => setActiveTab("top")}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      activeTab === "top"
                        ? "bg-gradient-to-r from-pink-500 to-purple-600"
                        : "bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800/50"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4 inline mr-2" />
                    Top Comments
                  </button>
                </div>

                {/* Comment Input */}
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/50 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                        {isAuthenticated ? (
                          <span className="font-bold text-lg">
                            {session?.user?.name?.[0] || "U"}
                          </span>
                        ) : (
                          <User className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-black" />
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <Input
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder={
                          isAuthenticated 
                            ? replyingTo 
                              ? `Replying to @${replyingTo}...` 
                              : "Add a comment..."
                            : "Login to comment..."
                        }
                        disabled={!isAuthenticated}
                        className="w-full pl-4 pr-20 py-3 rounded-xl bg-gray-900 border border-gray-800 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all"
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                      />
                      <button
                        onClick={handleAddComment}
                        disabled={!commentText.trim() || !isAuthenticated}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    {replyingTo && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-gray-400">Replying to @{replyingTo}</span>
                        <button
                          onClick={() => setReplyingTo(null)}
                          className="text-xs text-gray-500 hover:text-white transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
            <div className="space-y-6">
              {sortedComments.map((comment) => (
                <div 
                  key={comment.id} 
                  className={`p-4 rounded-2xl transition-all duration-300 ${
                    comment.isPinned 
                      ? "bg-gradient-to-br from-yellow-500/5 to-amber-600/5 border border-yellow-500/20"
                      : "bg-gray-900/30 hover:bg-gray-900/50 border border-gray-800/30 hover:border-pink-500/30"
                  }`}
                >
                  {comment.isPinned && (
                    <div className="flex items-center gap-2 mb-3 text-yellow-500 text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span className="font-medium">Pinned by creator</span>
                    </div>
                  )}
                  
                  <div className="flex gap-3">
                    {/* User Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 p-0.5">
                        <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
                          <span className="font-bold text-lg">
                            {comment.user.name[0]}
                          </span>
                        </div>
                      </div>
                      {comment.user.verified && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 border-2 border-black flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      {/* User Info */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{comment.user.name}</span>
                          {comment.user.isCreator && (
                            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-xs">
                              Creator
                            </span>
                          )}
                        </div>
                        <span className={`text-xs ${getTimeColor(comment.time)}`}>
                          <Clock className="w-3 h-3 inline mr-1" />
                          {comment.time}
                        </span>
                        {comment.isEdited && (
                          <span className="text-xs text-gray-500">(edited)</span>
                        )}
                      </div>

                      {/* Comment Text */}
                      {editingComment === comment.id ? (
                        <div className="space-y-2 mb-3">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-gray-900 border border-gray-800 focus:border-pink-500 outline-none"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveEdit(comment.id)}
                              className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingComment(null)}
                              className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-200 mb-3">{comment.text}</p>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-all duration-300 group"
                        >
                          <Heart
                            className={`w-4 h-4 transition-all ${
                              likedComments.has(comment.id)
                                ? "text-pink-500 fill-pink-500"
                                : "text-gray-400 group-hover:text-pink-500"
                            }`}
                          />
                          <span className={`text-sm ${
                            likedComments.has(comment.id) ? "text-pink-500" : "text-gray-400"
                          }`}>
                            {comment.likes}
                          </span>
                        </button>

                        <button
                          onClick={() => handleReply(comment.user.username)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-900/50 hover:bg-gray-800/50 transition-colors"
                        >
                          <Reply className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-400">Reply</span>
                        </button>

                        {/* More Options */}
                        <div className="relative group">
                          <button className="p-1.5 rounded-lg bg-gray-900/50 hover:bg-gray-800/50 transition-colors">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-800/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
                            <div className="p-2 space-y-1">
                              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors text-sm">
                                <Flag className="w-4 h-4" />
                                Report
                              </button>
                              {session?.user?.name === comment.user.name && (
                                <>
                                  <button 
                                    onClick={() => handleEditComment(comment.id, comment.text)}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800/50 transition-colors text-sm"
                                  >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors text-sm"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-6 border-l-2 border-gray-800/50 space-y-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MessageCircle className="w-4 h-4" />
                            {comment.replies.length} replies
                          </div>
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3 p-3 rounded-xl bg-gray-900/30 hover:bg-gray-900/50 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-xs font-bold">
                                {reply.user.name[0]}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-semibold">
                                    {reply.user.name}
                                  </span>
                                  {reply.user.verified && (
                                    <div className="w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center">
                                      <Check className="w-2 h-2" />
                                    </div>
                                  )}
                                  <span className={`text-xs ${getTimeColor(reply.time)}`}>
                                    {reply.time}
                                  </span>
                                  {reply.isEdited && (
                                    <span className="text-xs text-gray-500">(edited)</span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-300">{reply.text}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-pink-500 transition-colors">
                                    <Heart className="w-3 h-3" />
                                    {reply.likes}
                                  </button>
                                  <button className="text-xs text-gray-400 hover:text-white transition-colors">
                                    Reply
                                  </button>
                                </div>
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

            {/* End of Comments */}
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-400">You've reached the end of comments</p>
              <p className="text-sm text-gray-500 mt-1">Share your thoughts above!</p>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 p-4 bg-gradient-to-t from-black via-black to-transparent border-t border-gray-800/50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                <span className="text-pink-500 font-medium">{localComments.length}</span> comments •{" "}
                <span className="text-purple-500 font-medium">1.2K</span> likes
              </div>
              <Button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 transition-opacity"
              >
                Close Comments
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}