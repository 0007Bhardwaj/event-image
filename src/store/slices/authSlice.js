import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cognitoAuth from '../../config/cognito';

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await cognitoAuth.signIn(email, password);
      return {
        user: response.user,
        token: response.idToken,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name, mobileNumber }, { rejectWithValue }) => {
    try {
      const attributes = {};
      if (name) attributes.name = name;
      if (mobileNumber) attributes.phone_number = mobileNumber;
      
      const response = await cognitoAuth.signUp(email, password, attributes);
      return {
        user: {
          email: email,
          name: name,
          mobileNumber: mobileNumber,
          sub: response.userSub,
          email_verified: false
        },
        requiresConfirmation: true,
        userSub: response.userSub
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const confirmSignUp = createAsyncThunk(
  'auth/confirmSignUp',
  async ({ email, confirmationCode }, { rejectWithValue }) => {
    try {
      await cognitoAuth.confirmSignUp(email, confirmationCode);
      return { email, confirmed: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Confirmation failed');
    }
  }
);

export const resendConfirmationCode = createAsyncThunk(
  'auth/resendConfirmationCode',
  async (email, { rejectWithValue }) => {
    try {
      await cognitoAuth.resendConfirmationCode(email);
      return { email, resent: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to resend code');
    }
  }
);


export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      await cognitoAuth.forgotPassword(email);
      return { email, sent: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to send reset email');
    }
  }
);

export const confirmForgotPassword = createAsyncThunk(
  'auth/confirmForgotPassword',
  async ({ email, confirmationCode, newPassword }, { rejectWithValue }) => {
    try {
      await cognitoAuth.confirmForgotPassword(email, confirmationCode, newPassword);
      return { email, reset: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Password reset failed');
    }
  }
);

export const checkCurrentUser = createAsyncThunk(
  'auth/checkCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await cognitoAuth.getCurrentUser();
      return {
        user: user,
        token: user.session.getIdToken().getJwtToken(),
        accessToken: user.session.getAccessToken().getJwtToken(),
        refreshToken: user.session.getRefreshToken().getToken()
      };
    } catch (error) {
      return rejectWithValue(error.message || 'No current user');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await cognitoAuth.signOut();
      return { loggedOut: true };
    } catch (error) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  requiresConfirmation: false,
  confirmationEmail: null,
  passwordResetSent: false,
  passwordResetEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      state.requiresConfirmation = false;
      state.confirmationEmail = null;
      state.passwordResetSent = false;
      state.passwordResetEmail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearConfirmation: (state) => {
      state.requiresConfirmation = false;
      state.confirmationEmail = null;
    },
    clearPasswordReset: (state) => {
      state.passwordResetSent = false;
      state.passwordResetEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.requiresConfirmation = action.payload.requiresConfirmation;
        state.confirmationEmail = action.payload.user.email;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Confirm Sign Up
      .addCase(confirmSignUp.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requiresConfirmation = false;
        state.confirmationEmail = null;
        state.error = null;
      })
      .addCase(confirmSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Resend Confirmation Code
      .addCase(resendConfirmationCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendConfirmationCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resendConfirmationCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.passwordResetSent = true;
        state.passwordResetEmail = action.payload.email;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Confirm Forgot Password
      .addCase(confirmForgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.passwordResetSent = false;
        state.passwordResetEmail = null;
        state.error = null;
      })
      .addCase(confirmForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Check Current User
      .addCase(checkCurrentUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearConfirmation, clearPasswordReset } = authSlice.actions;
export default authSlice.reducer;
