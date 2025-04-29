export interface PaymentProcessingUIProps {
  progress: number;
  currentCatchphrase: string;
  currentEmoji: string;
  status: 'processing' | 'success' | 'error';
  errorMessage: string;
  downloadUrl: string;
}

declare const PaymentProcessingUI: React.FC<PaymentProcessingUIProps>;

export default PaymentProcessingUI; 