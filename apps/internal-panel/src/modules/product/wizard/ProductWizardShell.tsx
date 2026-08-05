import { toast } from 'sonner';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Step1BaseDetails } from './Step1BaseDetails';
import { Step2Compliance } from './Step2Compliance';
import { Step3Variants } from './Step3Variants';
import { Step4Media } from './Step4Media';
import { Step5SeoContent } from './Step5SeoContent';
import { Step6ReviewSubmit } from './Step6ReviewSubmit';
import { Check, ChevronRight, Loader2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { productApi } from '../../../core/api/product';

// Comprehensive schema for all wizard steps
const productWizardSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().min(1, "Brand is required"),
  description: z.string().min(10, "Please provide a detailed description"),
  hsnCode: z.string().min(4, "Valid HSN code required"),
  gstRate: z.coerce.number().min(0, "GST rate is required"),
  claims: z.string().optional(),
  warnings: z.string().optional(),
  variants: z.array(z.object({
    sku: z.string().min(1, "SKU is required"),
    size: z.string().optional(),
    mrp: z.coerce.number().min(0),
    price: z.coerce.number().min(0),
    shadeName: z.string().optional(),
    shadeHex: z.string().optional(),
  })).optional(),
});

type ProductFormValues = z.infer<typeof productWizardSchema>;

const STEPS = [
  { id: 1, title: 'Base Details' },
  { id: 2, title: 'Compliance' },
  { id: 3, title: 'Variants' },
  { id: 4, title: 'Media' },
  { id: 5, title: 'SEO & Content' },
  { id: 6, title: 'Review' },
];

export const ProductWizardShell = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<any>({
    resolver: zodResolver(productWizardSchema),
    mode: 'onChange',
    defaultValues: {
      gstRate: 18,
    }
  });

  const { handleSubmit, trigger } = methods;

  const { data: productData, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProduct(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (productData) {
      methods.reset({
        name: productData.name,
        categoryId: productData.categoryId,
        brandId: productData.brandId || '',
        description: productData.description || '',
        hsnCode: productData.hsnCode || '',
        gstRate: productData.gstRate || 18,
        claims: productData.claims || '',
        warnings: productData.warnings || '',
        variants: productData.variants?.map((v: any) => ({
          sku: v.sku,
          size: v.size || '',
          mrp: v.mrp,
          price: v.price,
          shadeName: v.shadeName || '',
          shadeHex: v.shadeHex || '',
        })) || []
      });
    }
  }, [productData, methods]);

  const nextStep = async () => {
    // Validate current step fields before moving on
    let fieldsToValidate: (keyof ProductFormValues)[] = [];
    if (currentStep === 1) fieldsToValidate = ['name', 'categoryId', 'brandId', 'description'];
    if (currentStep === 2) fieldsToValidate = ['hsnCode', 'gstRate'];

    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      if (currentStep < STEPS.length) {
        setCurrentStep(prev => prev + 1);
      } else {
        // If it's the last step, submit
        handleSubmit(onSubmit, (errors) => {
          console.error("Validation errors:", errors);
          toast.error("Please fill in all required fields correctly.");
        })();
      }
    } else {
      toast.error("Please fix the validation errors before continuing.");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const createMutation = useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      toast.success('Product created successfully!');
      navigate('/product');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create product. Please try again.');
    }
  });

  const updateMutation = useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: () => {
      toast.success('Product updated successfully!');
      navigate('/product');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update product. Please try again.');
    }
  });

  const onSubmit = (data: any) => {
    console.log("Submitting Product:", data);
    
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const primaryVariant = data.variants?.[0];

    // Map form data to DTO expected by backend
    const dto = {
      name: data.name,
      slug: slug,
      sku: primaryVariant?.sku || `SKU-${Date.now()}`,
      categoryId: data.categoryId,
      description: data.description,
      mrp: primaryVariant?.mrp || 0,
      discountPrice: primaryVariant?.price || 0,
      gstRate: data.gstRate,
      status: 'LIVE',
      productLine: 'BOTH'
    };

    if (id) {
      updateMutation.mutate({ id, data: dto });
    } else {
      createMutation.mutate(dto);
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-4xl mx-auto py-6">
        {/* Stepper UI */}
        {isLoading && <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary-500" /></div>}
        <div className={isLoading ? 'hidden' : ''}>
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-500 rounded-full z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            ></div>
            
            {STEPS.map((step) => {
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                      isCompleted 
                        ? 'bg-primary-500 border-primary-500 text-white' 
                        : isActive 
                          ? 'bg-white border-primary-500 text-primary-600' 
                          : 'bg-white border-slate-200 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <span className={`absolute top-12 whitespace-nowrap text-xs font-medium ${
                    isActive ? 'text-primary-700' : 'text-slate-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[400px] mt-12">
          {currentStep === 1 && <Step1BaseDetails />}
          {currentStep === 2 && <Step2Compliance />}
          {currentStep === 3 && <Step3Variants />}
          {currentStep === 4 && <Step4Media />}
          {currentStep === 5 && <Step5SeoContent />}
          {currentStep === 6 && <Step6ReviewSubmit />}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2.5 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors flex items-center shadow-sm"
          >
            {currentStep === STEPS.length ? 'Submit Product' : 'Continue'}
            {currentStep < STEPS.length && <ChevronRight className="h-4 w-4 ml-2" />}
          </button>
        </div>
        </div>
      </div>
    </FormProvider>
  );
};
