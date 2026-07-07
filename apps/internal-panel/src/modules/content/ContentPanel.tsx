import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PanelHeader from '../../components/PanelHeader';
import StatCard from '../../components/StatCard';
import { FileText, Image, Video, Globe, Plus, Search, 
  Eye, Edit3, Trash2, Calendar,  CheckCircle2,
  Tag,   ExternalLink, Copy } from 'lucide-react';

const useContentOverview = () => useQuery({
  queryKey: ['contentOverview'],
  queryFn: async () => ({
    totalPosts: 48,
    published: 32,
    drafts: 12,
    archived: 4,
    totalMedia: 156,
    totalPages: 8,
    viewsThisMonth: 24500,
  })
});

const useBlogPosts = () => useQuery({
  queryKey: ['blogPosts'],
  queryFn: async () => ([
    { id: 'POST-001', title: 'Top 10 Skincare Routines for Summer 2026', slug: '/blog/skincare-routines-summer-2026', status: 'Published', author: 'Priya M.', category: 'Skincare Tips', seoTitle: 'Best Summer Skincare Routines 2026', views: 3420, publishedAt: '2026-07-01', featuredImage: true },
    { id: 'POST-002', title: 'How to Choose the Right Sunscreen for Your Skin Type', slug: '/blog/choose-right-sunscreen', status: 'Published', author: 'Anita R.', category: 'Product Guides', seoTitle: 'Sunscreen Guide by Skin Type', views: 2810, publishedAt: '2026-06-28', featuredImage: true },
    { id: 'POST-003', title: 'Introducing Our New Vitamin C Serum Range', slug: '/blog/new-vitamin-c-serum', status: 'Draft', author: 'Priya M.', category: 'Product Launch', seoTitle: 'COSKINn Vitamin C Serum - New Launch', views: 0, publishedAt: null, featuredImage: false },
    { id: 'POST-004', title: 'Understanding Ingredients: Niacinamide vs Hyaluronic Acid', slug: '/blog/niacinamide-vs-hyaluronic-acid', status: 'Published', author: 'Dr. Meena K.', category: 'Education', seoTitle: 'Niacinamide vs Hyaluronic Acid - Complete Guide', views: 5670, publishedAt: '2026-06-20', featuredImage: true },
    { id: 'POST-005', title: 'Behind the Scenes: How We Source Our Ingredients', slug: '/blog/sourcing-ingredients', status: 'Draft', author: 'Anita R.', category: 'Brand Story', seoTitle: 'COSKINn Ingredient Sourcing', views: 0, publishedAt: null, featuredImage: true },
    { id: 'POST-006', title: 'Customer Spotlight: Real Stories, Real Results', slug: '/blog/customer-spotlight', status: 'Published', author: 'Priya M.', category: 'Testimonials', seoTitle: 'Real Customer Results with COSKINn', views: 1890, publishedAt: '2026-06-15', featuredImage: true },
    { id: 'POST-007', title: 'Monsoon Skincare Essentials', slug: '/blog/monsoon-skincare', status: 'Archived', author: 'Dr. Meena K.', category: 'Skincare Tips', seoTitle: 'Monsoon Skincare Guide', views: 890, publishedAt: '2025-07-10', featuredImage: true },
  ])
});

const useStaticPages = () => useQuery({
  queryKey: ['staticPages'],
  queryFn: async () => ([
    { id: 'PAGE-001', title: 'About Us', slug: '/about', status: 'Published', lastUpdated: '2026-06-01' },
    { id: 'PAGE-002', title: 'Privacy Policy', slug: '/privacy', status: 'Published', lastUpdated: '2026-05-15' },
    { id: 'PAGE-003', title: 'Terms & Conditions', slug: '/terms', status: 'Published', lastUpdated: '2026-05-15' },
    { id: 'PAGE-004', title: 'Shipping & Returns', slug: '/shipping', status: 'Published', lastUpdated: '2026-06-10' },
    { id: 'PAGE-005', title: 'Contact Us', slug: '/contact', status: 'Published', lastUpdated: '2026-06-01' },
    { id: 'PAGE-006', title: 'FAQ', slug: '/faq', status: 'Draft', lastUpdated: '2026-07-05' },
  ])
});

const useMediaAssets = () => useQuery({
  queryKey: ['mediaAssets'],
  queryFn: async () => ([
    { id: 'MED-001', name: 'hero-banner-summer.jpg', type: 'Image', size: '2.4 MB', uploadedAt: '2026-07-01', usedIn: 3 },
    { id: 'MED-002', name: 'product-serum-video.mp4', type: 'Video', size: '18.7 MB', uploadedAt: '2026-06-28', usedIn: 1 },
    { id: 'MED-003', name: 'blog-thumbnail-skincare.png', type: 'Image', size: '850 KB', uploadedAt: '2026-06-25', usedIn: 2 },
    { id: 'MED-004', name: 'brand-logo-white.svg', type: 'Image', size: '12 KB', uploadedAt: '2026-01-01', usedIn: 8 },
    { id: 'MED-005', name: 'customer-testimonial.mp4', type: 'Video', size: '24.1 MB', uploadedAt: '2026-06-15', usedIn: 1 },
  ])
});

export default function ContentPanel() {
  const [activeTab, setActiveTab] = useState<'posts' | 'pages' | 'media'>('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const { data: overview, isLoading: overviewLoading } = useContentOverview();
  const { data: posts } = useBlogPosts();
  const { data: pages } = useStaticPages();
  const { data: media } = useMediaAssets();

  const tabs = [
    { key: 'posts' as const, label: 'Blog Posts', icon: FileText },
    { key: 'pages' as const, label: 'Static Pages', icon: Globe },
    { key: 'media' as const, label: 'Media Library', icon: Image },
  ];

  const filteredPosts = posts?.filter(p => {
    const matchSearch = !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (s: string) => {
    switch (s) {
      case 'Published': return 'bg-emerald-100 text-emerald-700';
      case 'Draft': return 'bg-yellow-100 text-yellow-700';
      case 'Archived': return 'bg-gray-200 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-6 p-4 overflow-y-auto h-full">
      <PanelHeader
        title="Content Management"
        subtitle="Blog posts, static pages, and media assets"
        icon={FileText}
        actionLabel="New Post"
        onAction={() => alert('Create post (coming soon)')}
        actionIcon={Plus}
      />

      {/* KPI Cards */}
      {overviewLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 rounded-2xl bg-white/40 animate-pulse" />)}
        </div>
      ) : overview && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Published Posts" value={overview.published} icon={CheckCircle2} />
          <StatCard label="Drafts" value={overview.drafts} icon={Edit3} />
          <StatCard label="Media Assets" value={overview.totalMedia} icon={Image} />
          <StatCard label="Views This Month" value={overview.viewsThisMonth} icon={Eye} trend="+22.4%" trendUp />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-0">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all duration-200 ${
                activeTab === tab.key
                  ? 'border-[#FF0069] text-[#FF0069]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Blog Posts Tab */}
      {activeTab === 'posts' && (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#FF0069]/30 focus:border-[#FF0069] outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              {['All', 'Published', 'Draft', 'Archived'].map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === s ? 'bg-[#FF0069] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredPosts?.map(post => (
              <div key={post.id} className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusBadge(post.status)}`}>
                        {post.status}
                      </span>
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                        <Tag className="w-3 h-3 inline mr-1" />{post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#FF0069] transition-colors">{post.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>By {post.author}</span>
                      {post.publishedAt && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.publishedAt}</span>}
                      <span className="text-gray-300">•</span>
                      <span className="font-mono text-gray-400">{post.slug}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">SEO: {post.seoTitle}</p>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    {post.status === 'Published' && (
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{post.views.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">views</p>
                      </div>
                    )}
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" title="Edit"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-red-50 text-red-400" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Static Pages Tab */}
      {activeTab === 'pages' && pages && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Page</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">URL Slug</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Last Updated</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pages.map(page => (
                  <tr key={page.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{page.title}</td>
                    <td className="px-5 py-3.5 text-sm font-mono text-gray-500">{page.slug}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadge(page.status)}`}>{page.status}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{page.lastUpdated}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="Edit"><Edit3 className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="Preview"><ExternalLink className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Media Library Tab */}
      {activeTab === 'media' && media && (
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">{media.length} assets</p>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF0069] to-[#FFD498] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" /> Upload
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">File</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Size</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Uploaded</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Used In</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {media.map(m => (
                  <tr key={m.id} className="hover:bg-white/60 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-gray-700 flex items-center gap-2">
                      {m.type === 'Video' ? <Video className="w-4 h-4 text-purple-500" /> : <Image className="w-4 h-4 text-blue-500" />}
                      {m.name}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.type === 'Video' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>{m.type}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-right text-gray-600">{m.size}</td>
                    <td className="px-5 py-3.5 text-sm text-gray-600">{m.uploadedAt}</td>
                    <td className="px-5 py-3.5 text-sm text-center font-semibold text-gray-700">{m.usedIn} posts</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500" title="Copy URL"><Copy className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
