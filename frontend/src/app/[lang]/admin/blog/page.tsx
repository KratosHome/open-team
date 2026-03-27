import { PenLine } from "lucide-react";

export default function AdminBlogPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4 animate-hero-left">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Publish <span className="text-gradient-cyan">Articles</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Manage your publication content, announcements, and technical updates.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 active:scale-95">
          <PenLine size={18} />
          <span>New Article</span>
        </button>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-12 text-center flex flex-col items-center justify-center min-h-[400px] animate-hero-up animation-delay-200 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-500">
          <PenLine size={32} className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-500" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Your canvas awaits</h3>
        <p className="max-w-md text-slate-400 text-center leading-relaxed">
          You haven't written any posts yet. Start crafting your first announcement to engage with the OpenTeam community.
        </p>
      </div>
    </div>
  )
}
