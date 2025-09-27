import { 
  CognitoUserPool, 
  CognitoUser, 
  AuthenticationDetails, 
  CognitoUserAttribute,
  CognitoIdToken,
  CognitoAccessToken,
  CognitoRefreshToken
} from 'amazon-cognito-identity-js';

// Cognito Configuration
// Replace these with your actual Cognito User Pool details
const poolData = {
  UserPoolId: 'ap-south-1_UGticddTE', // Replace with your User Pool ID
  ClientId: '6jj1m6avpjl7ck5tvn1j5jg9b2', // Replace with your App Client ID
};

// Create User Pool instance
export const userPool = new CognitoUserPool(poolData);

// Cognito Authentication Helper Functions
export const cognitoAuth = {
  // Sign Up
  signUp: (email, password, attributes = {}) => {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        ...Object.entries(attributes).map(([key, value]) => {
          // Map frontend field names to Cognito attribute names
          const cognitoAttributeName = key === 'name' ? 'name' : 
                                      key === 'mobileNumber' ? 'phone_number' : key;
          return new CognitoUserAttribute({ Name: cognitoAttributeName, Value: value });
        })
      ];

      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },

  // Confirm Sign Up
  confirmSignUp: (email, confirmationCode) => {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  },

  // Sign In
  signIn: (email, password) => {
    return new Promise((resolve, reject) => {
      const authenticationData = {
        Username: email,
        Password: password,
      };

      const authenticationDetails = new AuthenticationDetails(authenticationData);

      const userData = {
        Username: email,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const accessToken = result.getAccessToken().getJwtToken();
          const idToken = result.getIdToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          
          resolve({
            accessToken,
            idToken,
            refreshToken,
            user: {
              email: email,
              sub: result.getIdToken().payload.sub,
              email_verified: result.getIdToken().payload.email_verified
            }
          });
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // Handle new password required scenario
          reject(new Error('New password required'));
        }
      });
    });
  },

  // Sign Out
  signOut: () => {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.signOut();
        resolve();
      } else {
        resolve();
      }
    });
  },

  // Get Current User
  getCurrentUser: () => {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            reject(err);
            return;
          }
          if (session.isValid()) {
            const payload = session.getIdToken().getPayload();
            resolve({
              email: payload.email,
              sub: payload.sub,
              email_verified: payload.email_verified,
              session: session
            });
          } else {
            reject(new Error('Session is not valid'));
          }
        });
      } else {
        reject(new Error('No current user'));
      }
    });
  },

  // Forgot Password
  forgotPassword: (email) => {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  },

  // Confirm Forgot Password
  confirmForgotPassword: (email, confirmationCode, newPassword) => {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.confirmPassword(confirmationCode, newPassword, {
        onSuccess: () => {
          resolve();
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  },

  // Resend Confirmation Code
  resendConfirmationCode: (email) => {
    return new Promise((resolve, reject) => {
      const userData = {
        Username: email,
        Pool: userPool
      };

      const cognitoUser = new CognitoUser(userData);

      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }
};



export default cognitoAuth;
