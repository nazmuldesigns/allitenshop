import { Order } from '@/types';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendOrderConfirmationEmail(order: Order): Promise<{ success: boolean; messageId?: string; mocked?: boolean }> {
  const fromEmail = process.env.EMAIL_FROM || 'orders@pataghor.com';
  const customerEmail = order.customer_email;

  if (!customerEmail) {
    return { success: false };
  }

  const itemsHtml = (order.items || [])
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${item.book_title_bn} (${item.book_title})</strong>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">৳${item.total_price}</td>
      </tr>
    `
    )
    .join('');

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation - Pataghor (পাতাঘর)</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #FAF7F0; margin: 0; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #0B6E4F; color: #ffffff; padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">পাতাঘর (Pataghor)</h1>
          <p style="margin: 6px 0 0; color: #FAF7F0; font-size: 14px;">পাতা ওল্টান, জীবন গড়ুন • Every page, delivered.</p>
        </div>

        <div style="padding: 24px;">
          <h2 style="color: #0B6E4F; margin-top: 0;">অর্ডার নিশ্চিতকরণ / Order Confirmation</h2>
          <p>প্রিয় <strong>${order.customer_name}</strong>,</p>
          <p>পাতাঘর থেকে বই অর্ডার করার জন্য আপনাকে ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।</p>

          <div style="background: #FEF6E6; border-left: 4px solid #F4A300; padding: 12px; margin: 20px 0;">
            <p style="margin: 0;"><strong>অর্ডার নম্বর (Order No):</strong> ${order.order_number}</p>
            <p style="margin: 4px 0 0;"><strong>পেমেন্ট পদ্ধতি:</strong> ${order.payment_method.toUpperCase()} (ক্যাশ অন ডেলিভারি)</p>
          </div>

          <h3>অর্ডারের বিবরণ:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="padding: 10px; text-align: left;">বইয়ের নাম</th>
                <th style="padding: 10px; text-align: center;">পরিমাণ</th>
                <th style="padding: 10px; text-align: right;">মূল্য</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 8px 10px; text-align: right;">উপমোট (Subtotal):</td>
                <td style="padding: 8px 10px; text-align: right;">৳${order.subtotal}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 8px 10px; text-align: right;">ডেলিভারি চার্জ:</td>
                <td style="padding: 8px 10px; text-align: right;">৳${order.delivery_fee}</td>
              </tr>
              ${
                order.discount_amount > 0
                  ? `<tr>
                      <td colspan="2" style="padding: 8px 10px; text-align: right; color: #0B6E4F;">ডিসকাউন্ট:</td>
                      <td style="padding: 8px 10px; text-align: right; color: #0B6E4F;">-৳${order.discount_amount}</td>
                    </tr>`
                  : ''
              }
              <tr style="font-size: 16px; font-weight: bold;">
                <td colspan="2" style="padding: 12px 10px; text-align: right; border-top: 2px solid #ddd;">সর্বমোট (Grand Total):</td>
                <td style="padding: 12px 10px; text-align: right; border-top: 2px solid #ddd; color: #0B6E4F;">৳${order.total_amount}</td>
              </tr>
            </tfoot>
          </table>

          <h3>ডেলিভারি ঠিকানা:</h3>
          <p style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 0 0 20px;">
            ${order.shipping_street_address}<br/>
            ${order.shipping_upazila}, ${order.shipping_district}, ${order.shipping_division}<br/>
            ফোন: ${order.customer_phone}
          </p>

          <p style="color: #666; font-size: 13px;">ঢাকা সিটিতে ২-৩ দিন এবং অন্যান্য জেলায় ৩-৫ কার্যদিবসের মধ্যে আপনার পার্সেল পৌঁছে যাবে। কোনো প্রয়োজনে কল করুন আমাদের হটলাইনে।</p>
        </div>

        <div style="background: #f4f4f4; text-align: center; padding: 16px; font-size: 12px; color: #777;">
          © ${new Date().getFullYear()} Pataghor (পাতাঘর). All rights reserved.<br/>
          Dhaka, Bangladesh
        </div>
      </div>
    </body>
    </html>
  `;

  if (!resend) {
    // Graceful development logger
    console.log(`[EMAIL DEV MOCK] Resend API key not configured. Mocking email to ${customerEmail}:`);
    console.log(`Order Number: ${order.order_number}, Amount: ৳${order.total_amount}`);
    return { success: true, mocked: true };
  }

  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: `Order Confirmed: ${order.order_number} - Pataghor (পাতাঘর)`,
      html: emailHtml,
    });
    return { success: true, messageId: data.data?.id };
  } catch (error) {
    console.error('Failed to send Resend email:', error);
    return { success: false };
  }
}

