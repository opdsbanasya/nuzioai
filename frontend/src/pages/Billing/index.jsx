import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '@/store/useAppStore';
import api from '@/services/api';
import MainHeader from '@/components/MainHeader';
import { toast } from 'sonner';

export default function Billing() {
  const navigate = useNavigate();
  const { user, updateSetting } = useAppStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (amount, plan) => {
    if (!user || !user._id) return;
    setLoading(true);
    try {
      // 1. Create order on server
      const { data: order } = await api.post('/payment/create-order', {
        amount,
        plan,
        userId: user._id
      });

      // 2. Initialize Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy_key_id', // Uses real key if available, else dummy
        amount: order.amount,
        currency: order.currency,
        name: "Nuzio AI",
        description: `Upgrade to ${plan.toUpperCase()} Plan`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify payment on server
            await api.post('/payment/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              plan: plan
            });

            // 4. Update local state to unlock features
            updateSetting('subscriptionStatus', plan);
            toast.success(`Success! You are now a ${plan.toUpperCase()} user.`);
          } catch (error) {
            console.error(error);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: user.name || "Test User",
          email: user.email || "test@example.com",
        },
        theme: {
          color: "#8B5CF6", // Primary color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Failed to initiate payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-background text-foreground pb-24">
      <MainHeader rightAction="close" />

      <div className="px-6 mb-8">
        <h1 className="text-4xl font-heading mb-2 text-gray-200">Plan & billing</h1>
        <p className="text-muted-foreground text-sm">Start free. Upgrade when mornings pay for themselves.</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Free Plan */}
        <div className={`bg-card border ${user.subscriptionStatus === 'free' || !user.subscriptionStatus ? 'border-primary shadow-[0_0_15px_rgba(139,92,246,0.2)]' : 'border-border'} rounded-3xl p-6`}>
          <h2 className="text-xl font-bold mb-2">Free</h2>
          <div className="text-3xl font-heading text-primary mb-4">₹0<span className="text-sm font-sans text-muted-foreground italic">/mo</span></div>
          <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
            5 article summaries per niche daily. Ad supported. Push notifications.
          </p>
          <button className={`w-full py-4 rounded-xl font-semibold ${user.subscriptionStatus === 'free' || !user.subscriptionStatus ? 'bg-primary/20 text-primary cursor-default' : 'bg-muted text-muted-foreground'}`}>
            {(user.subscriptionStatus === 'free' || !user.subscriptionStatus) ? 'Current plan' : 'Downgrade to Free'}
          </button>
        </div>

        {/* Pro Plan */}
        <div className={`bg-background border ${user.subscriptionStatus === 'pro' ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-secondary shadow-[0_0_30px_rgba(52,211,153,0.1)]'} rounded-3xl p-6 relative`}>
          {user.subscriptionStatus !== 'pro' && <div className="absolute top-6 right-6 bg-secondary/20 text-secondary px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase">LAUNCH OFFER</div>}
          <h2 className="text-xl font-bold mb-2">Pro</h2>
          <div className="text-4xl font-heading text-blue-500 mb-4">₹79<span className="text-sm font-sans text-muted-foreground italic">/mo</span></div>
          <p className="text-sm text-muted-foreground mb-6 pr-8">
            Unlimited custom briefings, premium AI voices, multi-language support.
          </p>
          <button
            disabled={loading || user.subscriptionStatus === 'pro'}
            onClick={() => handlePayment(79, 'pro')}
            className={`w-full py-4 rounded-xl font-bold transition-opacity ${user.subscriptionStatus === 'pro' ? 'bg-blue-500/20 text-blue-500 cursor-default' : 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-lg hover:opacity-90'}`}
          >
            {user.subscriptionStatus === 'pro' ? 'Current plan' : (loading ? 'Processing...' : 'Upgrade to Pro')}
          </button>
        </div>

        {/* Pro Annual */}
        <div className={`bg-card border ${user.subscriptionStatus === 'annual' ? 'border-primary shadow-[0_0_30px_rgba(139,92,246,0.2)]' : 'border-border'} rounded-3xl p-6 relative`}>
          {user.subscriptionStatus !== 'annual' && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">BEST VALUE</div>}
          <h2 className="text-xl font-bold mb-2">Pro Annual</h2>
          <div className="text-4xl font-heading text-primary mb-4">₹1,499<span className="text-sm font-sans text-muted-foreground italic">/yr</span></div>
          <p className="text-sm text-muted-foreground mb-6">
            All Pro benefits, offline mode, priority features. Locks in your rate.
          </p>
          <button
            disabled={loading || user.subscriptionStatus === 'annual'}
            onClick={() => handlePayment(1499, 'annual')}
            className={`w-full py-4 rounded-xl font-bold transition-opacity ${user.subscriptionStatus === 'annual' ? 'bg-primary/20 text-primary cursor-default' : 'bg-muted text-muted-foreground hover:opacity-90'}`}
          >
            {user.subscriptionStatus === 'annual' ? 'Current plan' : 'Choose Annual'}
          </button>
        </div>
      </div>
    </div>
  );
}
