import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../lib/axios';
import { Plus, Edit3, Trash2, Save, X, MessageCircle } from 'lucide-react';

export default function FaqManager() {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  const { data: faqs, isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await api.get('/content/faqs');
      return res.data;
    }
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/content/admin/faqs', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      setIsCreating(false);
      setForm({});
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => api.put(`/content/admin/faqs/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
      setIsEditing(null);
      setForm({});
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/content/admin/faqs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['faqs'] });
    }
  });

  const handleSave = (id?: string) => {
    const data = {
      question: form.question,
      answer: form.answer,
      category: form.category || 'General',
      orderIndex: form.orderIndex ? parseInt(form.orderIndex) : 0
    };

    if (id) {
      updateMutation.mutate({ id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const renderForm = (id?: string) => (
    <div className="bg-orange-50 p-5 rounded-2xl shadow-sm border border-orange-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-900">{id ? 'Edit FAQ' : 'New FAQ'}</h3>
        <button onClick={() => id ? setIsEditing(null) : setIsCreating(false)} className="text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Category</label>
          <input 
            type="text" 
            placeholder="e.g. Shipping, Returns, Products"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.category || ''}
            onChange={e => setForm({...form, category: e.target.value})}
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-600">Order/Priority</label>
          <input 
            type="number" 
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.orderIndex || 0}
            onChange={e => setForm({...form, orderIndex: e.target.value})}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-gray-600">Question</label>
          <input 
            type="text" 
            placeholder="What is your return policy?"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none font-medium"
            value={form.question || ''}
            onChange={e => setForm({...form, question: e.target.value})}
          />
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-gray-600">Answer</label>
          <textarea 
            rows={4}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 outline-none"
            value={form.answer || ''}
            onChange={e => setForm({...form, answer: e.target.value})}
          />
        </div>
      </div>
      
      <div className="flex justify-end pt-4 mt-4 border-t border-orange-200">
        <button 
          onClick={() => handleSave(id)} 
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Save className="w-4 h-4" /> Save FAQ
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">FAQ Manager</h2>
          <p className="text-sm text-gray-500">Manage Frequently Asked Questions</p>
        </div>
        <button 
          onClick={() => { setIsCreating(true); setForm({ category: 'General', orderIndex: 0 }); }}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </button>
      </div>

      {isCreating && renderForm()}

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">Loading FAQs...</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-100">
            {faqs?.map((faq: any) => isEditing === faq.id ? (
              <div key={faq.id} className="p-4 bg-gray-50">
                {renderForm(faq.id)}
              </div>
            ) : (
              <div key={faq.id} className="p-5 hover:bg-gray-50 transition-colors group">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-8">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-0.5 rounded uppercase tracking-wider">
                        {faq.category || 'General'}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{faq.question}</h4>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setIsEditing(faq.id); setForm(faq); }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { if(confirm('Delete this FAQ?')) deleteMutation.mutate(faq.id); }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {(!faqs || faqs.length === 0) && !isCreating && (
              <div className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 font-semibold">No FAQs added yet</h3>
                <p className="text-gray-500 text-sm mt-1">Help your customers by adding common questions.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
