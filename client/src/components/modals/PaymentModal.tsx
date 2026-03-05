import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, User, Mail, Phone, Building, CheckCircle } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Initialize Stripe
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const paymentFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un email válido"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  company: z.string().optional(),
});

type PaymentFormData = z.infer<typeof paymentFormSchema>;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  coursePrice: number;
}

// Stripe Payment Form Component
const CheckoutForm: React.FC<{
  courseName: string;
  coursePrice: number;
  userInfo: PaymentFormData;
  discountInfo: any;
  onSuccess: () => void;
}> = ({ courseName, coursePrice, userInfo, discountInfo, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Error",
        description: "Stripe no está listo. Por favor, recarga la página.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // First, submit the elements to get any validation errors
    const { error: submitError } = await elements.submit();
    if (submitError) {
      toast({
        title: "Error en los datos",
        description: submitError.message,
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: "if_required",
      });

      if (error) {
        toast({
          title: "Error en el pago",
          description: error.message,
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded, now register the enrollment with payment confirmation
        try {
          await apiRequest("POST", "/api/confirm-course-payment", {
            ...userInfo,
            courseName,
            coursePrice: (discountInfo?.originalPrice || coursePrice) * 100,
            finalPrice: (discountInfo?.finalPrice || coursePrice) * 100,
            discountApplied: discountInfo?.discountAvailable || false,
            paymentIntentId: paymentIntent.id,
          });

          queryClient.invalidateQueries({ queryKey: ["/api/course-enrollments"] });
          onSuccess();
        } catch (enrollmentError) {
          toast({
            title: "Pago exitoso, pero error al registrar inscripción",
            description: "El pago se procesó correctamente, nos pondremos en contacto contigo.",
            variant: "destructive",
          });
        }
      }
    } catch (confirmError) {
      toast({
        title: "Error inesperado",
        description: "Hubo un problema al procesar el pago. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="min-h-[100px]">
        <PaymentElement 
          options={{
            layout: {
              type: 'accordion',
              defaultCollapsed: false,
              radios: true,
              spacedAccordionItems: false
            }
          }}
        />
      </div>
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-3 sm:py-2"
      >
        {isProcessing ? "Procesando..." : `Pagar $${discountInfo?.finalPrice || coursePrice} USD`}
      </Button>
    </form>
  );
};

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  courseName,
  coursePrice,
}) => {
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [clientSecret, setClientSecret] = useState("");
  const [userInfo, setUserInfo] = useState<PaymentFormData | null>(null);
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [isCheckingDiscount, setIsCheckingDiscount] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
  });

  // Check discount availability when modal opens
  React.useEffect(() => {
    if (isOpen && courseName === "Escuela de Vendedores Profesionales") {
      checkDiscountAvailability();
    }
  }, [isOpen, courseName]);

  const checkDiscountAvailability = async () => {
    setIsCheckingDiscount(true);
    try {
      const response = await apiRequest("POST", "/api/check-discount", {
        courseName,
        originalPrice: coursePrice,
      });
      const discountData = await response.json();
      setDiscountInfo(discountData);
    } catch (error) {
      console.error("Error checking discount:", error);
      setDiscountInfo({
        discountAvailable: false,
        originalPrice: coursePrice,
        finalPrice: coursePrice,
        discountAmount: 0,
        discountPercentage: 0,
        remainingSpots: 0
      });
    } finally {
      setIsCheckingDiscount(false);
    }
  };

  const onSubmit = async (data: PaymentFormData) => {
    setUserInfo(data);
    
    const finalPrice = discountInfo?.finalPrice || coursePrice;
    const discountApplied = discountInfo?.discountAvailable || false;
    
    // Create payment intent with Stripe
    try {
      const response = await apiRequest("POST", "/api/create-payment-intent", {
        amount: finalPrice,
        courseName,
        discountApplied,
      });
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
      setStep('payment');
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo iniciar el proceso de pago",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = () => {
    setStep('success');
  };

  const handleCloseAfterSuccess = () => {
    reset();
    setStep('info');
    setClientSecret("");
    setUserInfo(null);
    onClose();
  };

  const handleClose = () => {
    if (step === 'info') {
      onClose();
      reset();
    } else {
      setStep('info');
      setClientSecret("");
      setUserInfo(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-lg sm:text-xl">
            {step === 'success' ? (
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-600" />
            ) : (
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600" />
            )}
            {step === 'info' ? 'Inscripción al Curso' : step === 'payment' ? 'Procesar Pago' : 'Pago Confirmado'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 px-1">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <div className="font-semibold text-blue-900 text-sm sm:text-base">{courseName}</div>
            
            {/* Price Section */}
            {isCheckingDiscount ? (
              <div className="text-gray-500">Verificando descuentos disponibles...</div>
            ) : discountInfo?.discountAvailable ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-500 line-through">${discountInfo.originalPrice} USD</span>
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{discountInfo.discountPercentage}%
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  ${discountInfo.finalPrice} USD
                </div>
                <div className="text-sm text-green-700">
                  ¡Ahorro de ${discountInfo.discountAmount} USD! • Solo quedan {discountInfo.remainingSpots} cupos con descuento
                </div>
              </div>
            ) : courseName === "Escuela de Vendedores Profesionales" && discountInfo && !discountInfo.discountAvailable ? (
              <div className="space-y-2">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">${coursePrice} USD</div>
                <div className="text-sm text-amber-700">
                  El descuento por tiempo limitado ya no está disponible
                </div>
              </div>
            ) : (
              <div className="text-xl sm:text-2xl font-bold text-blue-600">${coursePrice} USD</div>
            )}
          </div>

          {step === 'info' && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center text-sm sm:text-base">
                  <User className="w-4 h-4 mr-2 flex-shrink-0" />
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Tu nombre completo"
                  className="text-sm sm:text-base"
                />
                {errors.name && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center text-sm sm:text-base">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  Correo electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="tu@email.com"
                  className="text-sm sm:text-base"
                />
                {errors.email && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center text-sm sm:text-base">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+52 449 123 4567"
                  className="text-sm sm:text-base"
                />
                {errors.phone && (
                  <p className="text-xs sm:text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center text-sm sm:text-base">
                  <Building className="w-4 h-4 mr-2 flex-shrink-0" />
                  Empresa (opcional)
                </Label>
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Nombre de tu empresa"
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs sm:text-sm text-green-800">
                  <strong>Pago Seguro:</strong> Tu pago se procesará de forma segura con Stripe.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="w-full sm:flex-1 order-2 sm:order-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 order-1 sm:order-2"
                >
                  Continuar al Pago
                </Button>
              </div>
            </form>
          )}

          {step === 'payment' && clientSecret && userInfo && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: {
                    colorPrimary: '#2563eb',
                    borderRadius: '8px',
                    fontSizeBase: '14px',
                  },
                  rules: {
                    '.Input': {
                      padding: '12px',
                    },
                  },
                },
              }}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-xs sm:text-sm">
                    <strong className="block">{userInfo.name}</strong>
                    <span className="block">{userInfo.email}</span>
                    <span className="block">{userInfo.phone}</span>
                    {userInfo.company && <span className="block">{userInfo.company}</span>}
                  </p>
                </div>
                
                <div className="min-h-[120px]">
                  <CheckoutForm
                    courseName={courseName}
                    coursePrice={coursePrice}
                    userInfo={userInfo}
                    discountInfo={discountInfo}
                    onSuccess={handlePaymentSuccess}
                  />
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="w-full text-sm sm:text-base"
                >
                  Volver
                </Button>
              </div>
            </Elements>
          )}

          {step === 'success' && userInfo && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-green-600">
                  🎉 ¡Felicidades! Tu pago se procesó exitosamente
                </h3>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="space-y-2 text-sm sm:text-base text-green-800">
                    <p className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <strong>Inscripción confirmada</strong>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" />
                      Revisa tu correo para detalles del curso y enlace de Zoom
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      🚀 ¡Prepárate para transformar tu carrera en ventas!
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm">
                    <p className="font-semibold text-blue-900">Datos de inscripción:</p>
                    <p><strong>Nombre:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Curso:</strong> {courseName}</p>
                    <p><strong>Precio:</strong> ${coursePrice} USD</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleCloseAfterSuccess}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                ¡Excelente! Cerrar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;