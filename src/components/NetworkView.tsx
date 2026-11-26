import { Check, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { NETWORK_CIRCLES } from '../data/futurecareData';
import { CommunityPost } from '../types/futurecare';

interface NetworkViewProps {
  joinedCircleIds: string[];
  onToggleJoinCircle: (circleId: string) => void;
  posts: CommunityPost[];
  onAddPost: (post: CommunityPost) => void;
}

export function NetworkView({
  joinedCircleIds,
  onToggleJoinCircle,
  posts,
  onAddPost,
}: NetworkViewProps) {
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [circleName, setCircleName] = useState(NETWORK_CIRCLES[0].name);
  const [postContent, setPostContent] = useState('');
  const [postError, setPostError] = useState('');

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setPostError('Please enter your name before posting.');
      return;
    }
    if (postContent.trim().length < 12) {
      setPostError('Please write a brief note or question (at least 12 characters).');
      return;
    }

    onAddPost({
      id: `post-${Date.now()}`,
      author: authorName.trim(),
      role: authorRole.trim() || 'FutureCare Cohort Member',
      circleName,
      timestamp: 'Just now',
      content: postContent.trim(),
      repliesCount: 0,
    });

    setPostContent('');
    setPostError('');
  };

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl [text-wrap:balance]">
          Peer Leadership Circles &amp; Regional Chapters
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600">
          Join daytime and care-supported roundtables built for high-trust sponsorship,
          hiring referrals, and practical shared-care strategies for children ages 0 to
          8.
        </p>
      </div>

      {/* Circles Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {NETWORK_CIRCLES.map((circle) => {
          const isJoined = joinedCircleIds.includes(circle.id);
          const displayMembers = isJoined
            ? circle.memberCount + 1
            : circle.memberCount;

          return (
            <article
              key={circle.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                  <span className="font-medium text-indigo-800">{circle.chapter}</span>
                  <span aria-hidden="true">·</span>
                  <span>{displayMembers} members</span>
                </div>

                <h2 className="mt-2 font-display text-xl font-bold text-slate-900">
                  {circle.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {circle.description}
                </p>

                <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">Schedule:</span>{' '}
                    {circle.schedule}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Focus:</span>{' '}
                    {circle.topicFocus}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      0–8 Care Support:
                    </span>{' '}
                    {circle.careSupport}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4">
                <button
                  type="button"
                  onClick={() => onToggleJoinCircle(circle.id)}
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-colors ${
                    isJoined
                      ? 'border border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                      : 'bg-indigo-800 text-white hover:bg-indigo-900'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Joined Circle · Leave</span>
                    </>
                  ) : (
                    <span>Join Leadership Circle</span>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Cohort Exchange Board */}
      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <form
            onSubmit={handlePublishPost}
            className="rounded-xl border border-slate-200 bg-white p-6"
          >
            <h2 className="font-display text-lg font-bold text-slate-900">
              Share a Cohort Question or Resource
            </h2>
            <p className="mt-1 text-xs text-slate-600">
              Ask for promotion panel feedback, share negotiation wins, or coordinate
              0–8 playgroup swaps.
            </p>

            <div className="mt-5 space-y-3.5">
              <div>
                <label
                  htmlFor="post-author"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Your Name
                </label>
                <input
                  id="post-author"
                  type="text"
                  value={authorName}
                  onChange={(e) => {
                    setAuthorName(e.target.value);
                    setPostError('');
                  }}
                  placeholder="e.g., Clara Mensah"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-800 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="post-role"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Role &amp; Organization (Optional)
                </label>
                <input
                  id="post-role"
                  type="text"
                  value={authorRole}
                  onChange={(e) => setAuthorRole(e.target.value)}
                  placeholder="e.g., Engineering Manager, Atlas Bio"
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-800 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="post-circle"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Leadership Circle
                </label>
                <select
                  id="post-circle"
                  value={circleName}
                  onChange={(e) => setCircleName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-800 focus:outline-none"
                >
                  {NETWORK_CIRCLES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="post-content"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="post-content"
                  rows={3}
                  value={postContent}
                  onChange={(e) => {
                    setPostContent(e.target.value);
                    setPostError('');
                  }}
                  placeholder="Write your question, referral request, or early-care tip..."
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-800 focus:outline-none"
                />
              </div>

              {postError && (
                <p role="alert" className="text-xs font-medium text-red-700">
                  {postError}
                </p>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-800 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-900"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Post to Cohort Board</span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4 lg:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Recent Cohort Discussions
            </h2>
            <span className="font-mono text-xs text-slate-500 tabular-nums">
              {posts.length} threads
            </span>
          </div>

          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-xl border border-slate-200 bg-white p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div>
                  <span className="font-display font-semibold text-slate-900">
                    {post.author}
                  </span>{' '}
                  <span aria-hidden="true">·</span> <span>{post.role}</span>
                </div>
                <span>{post.timestamp}</span>
              </div>
              <p className="mt-1 text-xs font-medium text-indigo-800">
                {post.circleName}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {post.content}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 tabular-nums">
                <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {post.repliesCount} {post.repliesCount === 1 ? 'reply' : 'replies'}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
