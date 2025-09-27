# Production Setup for https://event-image.vercel.app/

## 🚀 **Complete Setup Checklist**

### **Step 1: AWS Cognito Configuration**

#### 1.1: Configure App Client
1. Go to AWS Cognito Console
2. Select your User Pool (`ap-south-1_UGticddTE`)
3. Go to "App integration" tab
4. Click on your app client (`6jj1m6avpjl7ck5tvn1j5jg9b2`)
5. Edit "Hosted authentication pages"
6. **Add callback URLs:**
   - `http://localhost:5174` (development)
   - `https://event-image.vercel.app` (production)
7. **Add sign-out URLs:**
   - `http://localhost:5174` (development)
   - `https://event-image.vercel.app` (production)
8. **Save changes**

### **Step 2: Update Application Code**

#### 2.1: Verify Configuration
In `src/config/cognito.js`, ensure your credentials are correct:
```javascript
const poolData = {
  UserPoolId: 'ap-south-1_UGticddTE', // Your User Pool ID
  ClientId: '6jj1m6avpjl7ck5tvn1j5jg9b2' // Your App Client ID
};
```

#### 2.2: Environment Variables (Optional)
Create `.env` file:
```env
REACT_APP_COGNITO_USER_POOL_ID=ap-south-1_UGticddTE
REACT_APP_COGNITO_CLIENT_ID=6jj1m6avpjl7ck5tvn1j5jg9b2
```

### **Step 3: Deploy to Vercel**

#### 3.1: Build and Deploy
```bash
npm run build
vercel --prod
```

#### 3.2: Environment Variables in Vercel
If using environment variables, add them in Vercel dashboard:
- `REACT_APP_COGNITO_USER_POOL_ID`
- `REACT_APP_COGNITO_CLIENT_ID`

### **Step 4: Test Authentication**

#### 4.1: Test Flow
1. **Visit:** https://event-image.vercel.app/
2. **Register:** Create a new account with email/password
3. **Confirm:** Check email for confirmation code
4. **Login:** Sign in with your credentials
5. **Expected:** Successful authentication and redirect to home

#### 4.2: Troubleshooting
- **Registration Error:** Check User Pool configuration
- **Login Error:** Verify credentials and user status
- **Redirect Error:** Check callback URLs configuration
- **Email Error:** Verify email delivery settings

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

Your Cognito authentication should work perfectly on https://event-image.vercel.app/ once you complete this setup! 🎉
