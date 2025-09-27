# AWS Cognito Setup Guide

## 🚀 **Quick Setup for Email/Password Authentication**

### **Step 1: Create Cognito User Pool**

1. **Go to AWS Cognito Console**
   - Navigate to [AWS Cognito](https://console.aws.amazon.com/cognito/)
   - Click "Create user pool"

2. **Configure Sign-in options**
   - Select "Email" as the sign-in option
   - Click "Next"

3. **Configure security requirements**
   - Password policy: Choose your requirements
   - Multi-factor authentication: Optional
   - Click "Next"

4. **Configure sign-up experience**
   - Self-service sign-up: Enabled
   - Required attributes: Email
   - Optional attributes: Name, Phone number
   - Click "Next"

5. **Configure message delivery**
   - Email: Use Cognito default email
   - Click "Next"

6. **Integrate your app**
   - User pool name: `EventPhotos-UserPool`
   - App client name: `EventPhotos-WebClient`
   - Click "Next"

7. **Review and create**
   - Review your settings
   - Click "Create user pool"

### **Step 2: Get Your Credentials**

After creating the user pool, you'll get:
- **User Pool ID**: `ap-south-1_XXXXXXXXX`
- **App Client ID**: `XXXXXXXXXXXXXXXXXXXXXXXXXX`

### **Step 3: Update Configuration**

Update `src/config/cognito.js` with your credentials:

```javascript
const poolData = {
  UserPoolId: 'ap-south-1_UGticddTE', // Your User Pool ID
  ClientId: '6jj1m6avpjl7ck5tvn1j5jg9b2' // Your App Client ID
};
```

### **Step 4: Configure App Client Settings**

1. **In your Cognito User Pool:**
   - Go to "App integration" tab
   - Select your app client
   - Edit "Hosted authentication pages"

2. **Add callback URLs:**
   - `http://localhost:5174` (for development)
   - `https://event-image.vercel.app` (for production)

3. **Add sign-out URLs:**
   - `http://localhost:5174` (for development)
   - `https://event-image.vercel.app` (for production)

### **Step 5: Test Authentication**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test the flow:**
   - Visit `http://localhost:5174/register`
   - Create a new account
   - Check your email for confirmation code
   - Visit `http://localhost:5174/confirm-signup`
   - Enter the confirmation code
   - Visit `http://localhost:5174/login`
   - Sign in with your credentials

### **Step 6: Deploy to Production**

1. **Build your app:**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Update Cognito settings:**
   - Add `https://event-image.vercel.app` to callback URLs
   - Add `https://event-image.vercel.app` to sign-out URLs

## 🎯 **Final Configuration**

### **Your Cognito URLs:**
- **User Pool:** `ap-south-1_UGticddTE`
- **App Client:** `6jj1m6avpjl7ck5tvn1j5jg9b2`

### **Your App URLs:**
- **Development:** `http://localhost:5174`
- **Production:** `https://event-image.vercel.app`

## ✅ **Success Indicators**

- ✅ Email/Password registration works on Register page
- ✅ Email confirmation works on Confirm SignUp page
- ✅ Email/Password login works on Login page
- ✅ Users can authenticate with Cognito
- ✅ Users are redirected back to your app
- ✅ User session is created with Cognito data
- ✅ Works on both development and production domains

## 🚨 **Important Notes**

1. **Update Cognito settings** with your production domain
2. **Test thoroughly** on both development and production
3. **Keep credentials secure** - never commit to version control
4. **Monitor logs** for any authentication errors

Your Cognito authentication should work perfectly once you complete this setup! 🎉
