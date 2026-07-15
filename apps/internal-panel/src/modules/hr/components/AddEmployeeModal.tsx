import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
import { X, UserPlus, Mail, Phone, Briefcase, Building2, Wallet, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const employeeSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  department: z.string().min(1, 'Department is required'),
  salary: z.coerce.number().min(0, 'Salary must be a positive number'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').optional().or(z.literal('')),
  joinDate: z.string().min(1, 'Join date is required'),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
  const queryClient = useQueryClient();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
      department: '',
      salary: 0,
      phone: '',
      joinDate: new Date().toISOString().split('T')[0],
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: EmployeeFormValues) => {
      const res = await api.post('/admin/hr/employees', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['hrOverview'] });
      toast.success('Employee added successfully');
      reset();
      onClose();
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to add employee');
    }
  });

  if (!isOpen) return null;

  const onSubmit = (data: EmployeeFormValues) => {
    createMutation.mutate(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-lg">
            <UserPlus className="w-5 h-5 text-[#FF0069]" />
            Add New Employee
          </div>
          <button 
            onClick={() => { reset(); onClose(); }}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-gray-400" /> Full Name *
              </label>
              <input 
                {...register('name')}
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF0069] focus:border-transparent outline-none transition-all text-sm"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-gray-400" /> Email Address *
              </label>
              <input 
                {...register('email')}
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF0069] focus:border-transparent outline-none transition-all text-sm"
                placeholder="john@coskinn.com"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-gray-400" /> Role *
              </label>
              <input 
                {...register('role')}
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF0069] focus:border-transparent outline-none transition-all text-sm"
                placeholder="Warehouse Staff"
              />
              {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-gray-400" /> Department *
              </label>
              <select 
                {...register('department')}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF0069] focus:border-transparent outline-none transition-all text-sm bg-white"
              >
                <option value="" disabled>Select department</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Support">Support</option>
                <option value="Management">Management</option>
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
              </select>
              {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-gray-400" /> Annual Salary (₹) *
              </label>
              <input 
                {...register('salary')}
                type="number" 
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF0069] focus:border-transparent outline-none transition-all text-sm"
                placeholder="400000"
              />
              {errors.salary && <p className="text-xs text-red-500">{errors.salary.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-gray-400" /> Phone Number
              </label>
              <input 
                {...register('phone')}
                type="tel" 
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF0069] focus:border-transparent outline-none transition-all text-sm"
                placeholder="+91 9876543210"
              />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" /> Join Date *
              </label>
              <input 
                {...register('joinDate')}
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF0069] focus:border-transparent outline-none transition-all text-sm"
              />
              {errors.joinDate && <p className="text-xs text-red-500">{errors.joinDate.message}</p>}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={() => { reset(); onClose(); }}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FF0069] to-[#FF4D8D] rounded-xl hover:shadow-lg hover:shadow-[#FF0069]/20 focus:outline-none focus:ring-2 focus:ring-[#FF0069] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {createMutation.isPending ? 'Adding...' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
