import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '../../core/api/content';
import { HelpCircle, Plus, Save, Trash2, Edit, Loader2 } from 'lucide-react';

export const FaqManagementScreen = () => {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('GENERAL');
  const [displayOrder, setDisplayOrder] = useState<number>(0);
  const [published, setPublished] = useState(true);

  const { data: faqs, isLoading } = useQuery({
    queryKey: ['content', 'faqs'],
    queryFn: () => contentApi.getFaqs()
  });

  const resetForm = () => {
    setQuestion('');
    setAnswer('');
    setCategory('GENERAL');
    setDisplayOrder(0);
    setPublished(true);
    setIsAdding(false);
    setEditingId(null);
  };

  const addMutation = useMutation({
    mutationFn: () => contentApi.createFaq({ question, answer, category, displayOrder, published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'faqs'] });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: () => contentApi.updateFaq(editingId!, { question, answer, category, displayOrder, published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'faqs'] });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contentApi.deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content', 'faqs'] });
    }
  });

  const handleEdit = (faq: any) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setCategory(faq.category);
    setDisplayOrder(faq.displayOrder);
    setPublished(faq.published);
    setIsAdding(true);
  };

  const categories = Array.from(new Set(faqs?.map((f: any) => f.category) || ['GENERAL', 'SHIPPING', 'PRODUCTS']));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">FAQ Management</h1>
          <p className="text-slate-500 text-sm mt-1">Manage Frequently Asked Questions for the storefront.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setIsAdding(true); }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Add FAQ
        </button>
      </div>

      {isAdding && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">{editingId ? 'Edit FAQ' : 'New FAQ'}</h3>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-1">Question <span className="text-rose-500">*</span></label>
              <input 
                type="text" 
                value={question}
                onChange={e => setQuestion(e.target.value)}
                placeholder="e.g. How long does shipping take?"
                className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-900 mb-1">Answer <span className="text-rose-500">*</span></label>
              <textarea 
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={3}
                className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-1">Category</label>
                <input 
                  type="text" 
                  value={category}
                  onChange={e => setCategory(e.target.value.toUpperCase())}
                  placeholder="e.g. SHIPPING"
                  className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-900 mb-1">Display Order</label>
                <input 
                  type="number" 
                  value={displayOrder}
                  onChange={e => setDisplayOrder(Number(e.target.value))}
                  className="w-full border-indigo-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 bg-white"
                />
              </div>
              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-2 cursor-pointer mt-5">
                  <input 
                    type="checkbox" 
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500" 
                  />
                  <span className="text-sm font-medium text-indigo-900">Publish immediately</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-indigo-100 pt-4">
            <button 
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-50"
            >
              Cancel
            </button>
            <button 
              onClick={() => editingId ? updateMutation.mutate() : addMutation.mutate()}
              disabled={!question || !answer || addMutation.isPending || updateMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center"
            >
              {addMutation.isPending || updateMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
              {editingId ? 'Update FAQ' : 'Save FAQ'}
            </button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-slate-500">Loading FAQs...</div>
      ) : !faqs || faqs.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
          <HelpCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="font-medium text-slate-900">No FAQs found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categories.map((cat: any) => (
            <div key={cat} className="space-y-4">
              <h3 className="font-bold text-slate-700 text-lg border-b border-slate-200 pb-2">{cat}</h3>
              <div className="grid grid-cols-1 gap-4">
                {faqs.filter((f: any) => f.category === cat).sort((a: any, b: any) => a.displayOrder - b.displayOrder).map((faq: any) => (
                  <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            Order: {faq.displayOrder}
                          </span>
                          {!faq.published && (
                            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                              DRAFT
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{faq.question}</h4>
                        <p className="text-slate-600 text-sm mt-2">{faq.answer}</p>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(faq)}
                          className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if(window.confirm('Delete this FAQ?')) deleteMutation.mutate(faq.id);
                          }}
                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
