exports.verificationPinEmailTemplate = (verificationPin) => `
<html dir="ltr" lang="en">
  <head>
    <link rel="preload" as="image" href="https://react-email-demo-k6qpz0pxq-resend.vercel.app/static/aws-logo.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <body style="background-color:#fff;color:#212121">
    <table align="center" width="100%" role="presentation" style="padding:20px;margin:0 auto;background-color:#eee">
      <tr>
        <td style="text-align:center;">
          <h1 style="color:#333;">Verify your email address</h1>
          <p style="font-size:16px;">Your verification code is:</p>
          <h2 style="color:#333;">${verificationPin}</h2>
          <p style="font-size:14px;">(This code is valid for 10 minutes)</p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;


exports.welcomeEmailTemplate = (name, email) => `
<html dir="ltr" lang="en">
  <head>
    <link rel="preload" as="image" href="https://react-email-demo-k6qpz0pxq-resend.vercel.app/static/zephyrmart-logo.png" />
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        color: #333;
      }
      .container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin: 20px auto;
        max-width: 600px;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      .footer {
        font-size: 12px;
        color: #888;
        margin-top: 20px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container" align="center">
     <h1>Welcome to Squadpark, ${name}! ${email}</h1>
<p>We’re thrilled to have you as part of our community. Squadpark is here to make your shopping experience seamless and enjoyable.</p>
<a href="https://squadpark.com" class="button">Start Shopping</a>
<div class="footer">
  <p>If you have any questions, feel free to <a href="mailto:support@squadpark.com">contact us</a>.</p>
  <p>Happy Shopping, <br/> The Squadpark Team</p>
</div>

  </body>
</html>
`;