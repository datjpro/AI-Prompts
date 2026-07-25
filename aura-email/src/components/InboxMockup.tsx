import { motion } from 'motion/react';
import {
  Sparkles,
  Inbox,
  Star,
  Send,
  FileText,
  Archive,
  Trash2,
  Search,
  Reply,
  Forward,
  MoreHorizontal,
  Paperclip,
} from 'lucide-react';

export function InboxMockup() {
  const sidebarNav = [
    { icon: Inbox, label: 'Inbox', count: 12, active: true },
    { icon: Star, label: 'Starred', count: 3, active: false },
    { icon: Send, label: 'Sent', active: false },
    { icon: FileText, label: 'Drafts', count: 2, active: false },
    { icon: Archive, label: 'Archive', active: false },
    { icon: Trash2, label: 'Trash', active: false },
  ];

  const labels = [
    { name: 'Work', color: '#00d2ff' },
    { name: 'Personal', color: '#A4F4FD' },
    { name: 'Travel', color: '#f59e0b' },
    { name: 'Finance', color: '#10b981' },
  ];

  const messages = [
    {
      name: 'Linear',
      subject: 'Weekly product digest',
      preview: 'Your team shipped 23 issues this week...',
      time: '9:41 AM',
      unread: true,
      active: true,
    },
    {
      name: 'Sophia Chen',
      subject: 'Re: Q3 roadmap review',
      preview: 'Thanks for sending the deck over. I had a few thoughts...',
      time: '8:12 AM',
      unread: true,
      active: false,
    },
    {
      name: 'Figma',
      subject: 'Marcus commented on your file',
      preview: 'Love the new direction on the landing hero.',
      time: 'Yesterday',
      unread: false,
      active: false,
    },
    {
      name: 'Stripe',
      subject: 'Payout of $12,480.00 sent',
      preview: 'Your payout is on its way to your bank...',
      time: 'Yesterday',
      unread: false,
      active: false,
    },
    {
      name: 'Vercel',
      subject: 'Deployment ready for aura-web',
      preview: 'Preview is live at aura-web-g3f.vercel.app',
      time: 'Mon',
      unread: false,
      active: false,
    },
    {
      name: 'GitHub',
      subject: '[aura/core] PR #482 approved',
      preview: 'david-lim approved your pull request.',
      time: 'Mon',
      unread: false,
      active: false,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl shadow-2xl"
      >
        {/* Title Bar */}
        <div className="h-10 bg-black/40 border-b border-white/10 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-xs text-white/50 font-medium">Aura — Inbox</span>
          <div className="w-12" />
        </div>

        {/* Mockup Body Grid */}
        <div className="grid grid-cols-12 h-[520px] text-xs">
          {/* Sidebar (col-span-3) */}
          <div className="col-span-3 border-r border-white/10 bg-black/30 p-4 flex flex-col justify-between">
            <div>
              <button className="w-full rounded-lg bg-white text-black text-xs font-semibold px-3 py-2 flex items-center justify-center gap-2 mb-4 hover:bg-white/90 transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Compose with Aura</span>
              </button>

              <nav className="space-y-1">
                {sidebarNav.map((item) => (
                  <button
                    key={item.label}
                    className={`w-full px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      item.active
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                          item.active
                            ? 'bg-white/20 text-white'
                            : 'text-white/40'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>

              <div className="mt-6">
                <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider block mb-2 px-3">
                  Labels
                </span>
                <div className="space-y-1">
                  {labels.map((label) => (
                    <div
                      key={label.name}
                      className="px-3 py-1.5 flex items-center gap-2.5 text-white/60 hover:text-white cursor-pointer transition-colors"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: label.color }}
                      />
                      <span>{label.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message List (col-span-4) */}
          <div className="col-span-4 border-r border-white/10 flex flex-col bg-black/20">
            <div className="p-3 border-b border-white/10 flex items-center gap-2 text-xs text-white/40 bg-black/20">
              <Search className="w-3.5 h-3.5 text-white/40" />
              <span>Search mail</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-white/5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 cursor-pointer transition-colors ${
                    msg.active
                      ? 'bg-white/10 border-l-2 border-[#00d2ff]'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-medium ${
                        msg.unread ? 'text-white font-semibold' : 'text-white/70'
                      }`}
                    >
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-white/40">{msg.time}</span>
                  </div>
                  <div className="text-white/90 font-medium truncate mb-1">
                    {msg.subject}
                  </div>
                  <div className="text-white/40 text-[11px] truncate">
                    {msg.preview}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reader (col-span-5) */}
          <div className="col-span-5 flex flex-col bg-black/10">
            {/* Toolbar */}
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <Reply className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <Forward className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <Archive className="w-3.5 h-3.5" />
                </button>
                <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <button className="w-7 h-7 rounded-md hover:bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Reader Content */}
            <div className="p-4 flex-1 overflow-y-auto space-y-4">
              {/* Header */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  Weekly product digest
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] flex items-center justify-center text-xs font-bold text-white">
                      L
                    </div>
                    <div>
                      <div className="font-semibold text-white">Linear</div>
                      <div className="text-[10px] text-white/40">to me · 9:41 AM</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#00d2ff]/20 text-[#00d2ff] font-medium">
                    Work
                  </span>
                </div>
              </div>

              {/* Summary Card */}
              <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-[#A4F4FD] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Summary by Aura</span>
                </div>
                <p className="text-white/70 leading-relaxed text-[11px]">
                  Your team closed 23 issues, merged 14 PRs, and shipped 2 features. Top contributor: Marcus. No action needed.
                </p>
              </div>

              {/* Body text */}
              <div className="text-white/70 space-y-3 leading-relaxed text-[11px]">
                <p>Hi team,</p>
                <p>
                  Here is your weekly digest of everything happening across your projects. This was a strong week with significant progress on the Q3 roadmap.
                </p>
                <p>
                  Twenty-three issues were closed, fourteen pull requests were merged, and two customer-facing features went out. The velocity trend continues to climb.
                </p>
                <p>
                  Let me know if you would like a deeper breakdown by project or contributor.
                </p>
                <p className="text-white/50">— The Linear team</p>
              </div>

              {/* Attachment */}
              <div className="pt-2 border-t border-white/10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/80 hover:bg-white/10 transition-colors cursor-pointer">
                  <Paperclip className="w-3.5 h-3.5 text-white/50" />
                  <span>digest-may-6.pdf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
