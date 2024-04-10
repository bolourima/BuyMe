export type InvoiceType = {
  invoice_id: string;
  qPay_shortUrl: string;
  qr_image: string;
  qr_text: string;
  urls: {
    name: string;
    description: string;
    link: string;
    logo: string;
  }[];
};
