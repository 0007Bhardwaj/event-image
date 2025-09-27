# AWS Cognito Setup Instructions

## Prerequisites
1. AWS Account
2. AWS CLI configured (optional but recommended)

## Step 1: Create Cognito User Pool

### Using AWS Console:
1. Go to AWS Cognito service
2. Click "Create user pool"
3. Configure sign-in options:
   - Choose "Email" as the sign-in option
4. Configure security requirements:
   - Set password policy (minimum 8 characters, uppercase, lowercase, numbers, special characters)
   - Choose "No MFA" for simplicity (or enable MFA for production)
5. Configure sign-up experience:
   - Enable "Self-service sign-up"
   - Choose "Send email with Cognito" for verification
6. Configure message delivery:
   - Choose "Send email with Cognito"
7. Integrate your app:
   - Give your app a name (e.g., "EventPhotos")
   - Choose "Public client" (for web applications)
   - Enable "ALLOW_USER_SRP_AUTH" for authentication flow
8. Review and create the user pool

### Using AWS CLI:
```bash
aws cognito-idp create-user-pool \
    --pool-name "EventPhotos-UserPool" \
    --policies '{
        "PasswordPolicy": {
            "MinimumLength": 8,
            "RequireUppercase": true,
            "RequireLowercase": true,
            "RequireNumbers": true,
            "RequireSymbols": true
        }
    }' \
    --auto-verified-attributes email \
    --verification-message-template '{
        "DefaultEmailOption": "CONFIRM_WITH_CODE",
        "EmailSubject": "Verify your email for EventPhotos",
        "EmailMessage": "Your verification code is {####}"
    }'
```

## Step 2: Create App Client

### Using AWS Console:
1. In your user pool, go to "App integration" tab
2. Click "Create app client"
3. Configure app client:
   - App type: "Public client"
   - App client name: "EventPhotos-WebApp"
   - Authentication flows: Enable "ALLOW_USER_SRP_AUTH"
4. Create the app client

### Using AWS CLI:
```bash
aws cognito-idp create-user-pool-client \
    --user-pool-id "us-east-1_XXXXXXXXX" \
    --client-name "EventPhotos-WebApp" \
    --explicit-auth-flows ALLOW_USER_SRP_AUTH ALLOW_REFRESH_TOKEN_AUTH
```

## Step 3: Update Configuration

Update the configuration in `src/config/cognito.js`:

```javascript
const poolData = {
  UserPoolId: 'us-east-1_XXXXXXXXX', // Your User Pool ID
  ClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX', // Your App Client ID
};
```

## Step 4: Google Sign-In Setup with Cognito

### Prerequisites:
1. AWS Cognito User Pool (already created)
2. Google Cloud Console project

### Steps:

#### 4.1: Configure Google as Identity Provider in Cognito
1. Go to AWS Cognito Console
2. Select your User Pool
3. Go to "Sign-in experience" tab
4. Click "Add identity provider"
5. Choose "Google"
6. Configure Google provider:
   - **Client ID**: Your Google OAuth Client ID
   - **Client Secret**: Your Google OAuth Client Secret
   - **Authorize scopes**: `openid email profile`
   - **Attribute mapping**: Map Google attributes to Cognito attributes
     - `email` → `email`
     - `name` → `name`
     - `picture` → `picture`

#### 4.2: Create Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "EventPhotos Web Client"
   - Authorized JavaScript origins: Add your domains
     - `http://localhost:5174` (for development)
     - `https://event-image.vercel.app` (for production)
   - Authorized redirect URIs: Add your Cognito domain
     - `https://your-cognito-domain.auth.ap-south-1.amazoncognito.com/oauth2/idpresponse`

#### 4.3: Update App Client Settings
1. In your Cognito User Pool, go to "App integration" tab
2. Select your app client
3. Edit "Hosted authentication pages"
4. Add your domain to "Allowed callback URLs":
   - `http://localhost:5174` (for development)
   - `https://event-image.vercel.app` (for production)
5. Add your domain to "Allowed sign-out URLs":
   - `http://localhost:5174` (for development)
   - `https://event-image.vercel.app` (for production)

#### 4.4: Update Configuration
Update `src/config/cognito.js` with your Cognito domain:

```javascript
// Replace 'your-cognito-domain' with your actual Cognito domain
const domain = 'your-cognito-domain'; // e.g., 'myapp123456'
```

#### 4.5: Test Google Sign-In
1. Start your development server
2. Go to Login or Register page
3. Click "Continue with Google"
4. You'll be redirected to Cognito's hosted UI
5. Complete Google authentication
6. You'll be redirected back to your app with authentication tokens

### How It Works:

1. **User clicks "Continue with Google"**
2. **App redirects to Cognito's hosted UI** with Google as identity provider
3. **Cognito handles Google OAuth** (no direct Google integration needed)
4. **Google authenticates the user**
5. **Cognito receives Google user data**
6. **Cognito creates/updates user in User Pool**
7. **Cognito redirects back to your app** with Cognito tokens
8. **App processes Cognito tokens** and creates user session

### Benefits of This Approach:

- ✅ **No Google Client ID needed in frontend**
- ✅ **Cognito handles all OAuth complexity**
- ✅ **User data stored in Cognito User Pool**
- ✅ **Consistent token format** (Cognito tokens)
- ✅ **Better security** (OAuth handled server-side)
- ✅ **Easier to manage** (one place for all auth)

## Step 5: Environment Variables (Recommended)

Create a `.env` file in your project root:

```env
REACT_APP_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
REACT_APP_COGNITO_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
REACT_APP_COGNITO_REGION=us-east-1
```

Update `src/config/cognito.js` to use environment variables:

```javascript
const poolData = {
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
};
```

## Step 6: Testing

### Test User Registration:
1. Go to your app's register page
2. Enter a valid email and password
3. Check your email for verification code
4. Enter the verification code
5. Try logging in

### Test Password Reset:
1. Go to forgot password page
2. Enter your email
3. Check your email for reset code
4. Use the reset code to set a new password

## Troubleshooting

### Common Issues:

1. **"User does not exist" error:**
   - Make sure the user is confirmed
   - Check if the email is correct

2. **"Invalid verification code" error:**
   - Check if the code is correct
   - Make sure the code hasn't expired

3. **"Password does not meet requirements" error:**
   - Check your password policy in Cognito
   - Ensure password meets all requirements

4. **CORS errors:**
   - Add your domain to Cognito app client settings
   - Check if you're using HTTPS in production

### Debug Mode:
Enable debug mode in your browser's developer tools to see detailed error messages.

## Security Considerations

1. **Never expose sensitive credentials in client-side code**
2. **Use environment variables for configuration**
3. **Enable HTTPS in production**
4. **Consider enabling MFA for production**
5. **Regularly rotate app client secrets**
6. **Monitor authentication logs**

## Production Deployment

1. **Use HTTPS only**
2. **Configure proper CORS settings**
3. **Enable CloudWatch logging**
4. **Set up monitoring and alerts**
5. **Regular security audits**
6. **Backup user pool configuration**

## Support

For issues with AWS Cognito:
- AWS Cognito Documentation
- AWS Support (if you have a support plan)
- AWS Forums
- Stack Overflow
