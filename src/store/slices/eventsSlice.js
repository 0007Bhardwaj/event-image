import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Dummy data for events
const initialEvents = [
  {
    id: '1',
    name: 'Summer Music Festival 2024',
    date: '2024-07-15',
    location: 'Central Park, New York',
    description: 'A day filled with amazing music and great vibes',
    photos: [
      {
        id: '1',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-07-15T10:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com', 'admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '2',
        url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-07-15T11:30:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '3',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-07-15T12:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com', 'admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '4',
        url: 'https://images.unsplash.com/photo-1571266028243-e68ab9529a6a?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-07-15T12:30:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '5',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-07-15T13:00:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '6',
        url: 'https://images.unsplash.com/photo-1571266028243-e68ab9529a6a?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-07-15T13:30:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com', 'admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '7',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-07-15T14:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '8',
        url: 'https://images.unsplash.com/photo-1571266028243-e68ab9529a6a?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-07-15T14:30:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '9',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-07-15T15:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com', 'admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '10',
        url: 'https://images.unsplash.com/photo-1571266028243-e68ab9529a6a?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-07-15T15:30:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '11',
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-07-15T16:00:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '12',
        url: 'https://images.unsplash.com/photo-1571266028243-e68ab9529a6a?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-07-15T16:30:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com', 'admin@example.com'],
        processingStatus: 'completed'
      }
    ]
  },
  {
    id: '2',
    name: 'Tech Conference 2024',
    date: '2024-08-20',
    location: 'Convention Center, San Francisco',
    description: 'Latest trends in technology and innovation',
    photos: [
      {
        id: '13',
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-08-20T09:00:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '14',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-08-20T10:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '15',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-08-20T11:00:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com', 'user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '16',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-08-20T12:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '17',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-08-20T13:00:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com'],
        processingStatus: 'completed'
      }
    ]
  },
  {
    id: '3',
    name: 'Food & Wine Festival',
    date: '2024-09-10',
    location: 'Downtown Plaza, Chicago',
    description: 'Culinary delights and fine wines',
    photos: [
      {
        id: '18',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-09-10T14:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '19',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-09-10T15:30:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com', 'user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '20',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-09-10T16:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '21',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-09-10T16:30:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '22',
        url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
        uploadedBy: 'user',
        uploadedAt: '2024-09-10T17:00:00Z',
        faceDetected: true,
        facesDetected: ['user@example.com', 'admin@example.com'],
        processingStatus: 'completed'
      },
      {
        id: '23',
        url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
        uploadedBy: 'admin',
        uploadedAt: '2024-09-10T17:30:00Z',
        faceDetected: true,
        facesDetected: ['admin@example.com'],
        processingStatus: 'completed'
      }
    ]
  }
];

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return initialEvents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newEvent = {
        id: Date.now().toString(),
        ...eventData,
        photos: []
      };
      return newEvent;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadPhoto = createAsyncThunk(
  'events/uploadPhoto',
  async ({ eventId, file }, { rejectWithValue, getState }) => {
    try {
      // Simulate file upload to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a dummy URL for the uploaded file
      const photoUrl = URL.createObjectURL(file);
      
      const { auth } = getState();
      const currentUser = auth.user?.email || 'unknown';
      
      const newPhoto = {
        id: Date.now().toString(),
        url: photoUrl,
        uploadedBy: currentUser,
        uploadedAt: new Date().toISOString(),
        processingStatus: 'uploaded' // Backend will process face detection
      };
      
      return { eventId, photo: newPhoto };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserPhotos = createAsyncThunk(
  'events/getUserPhotos',
  async (userEmail, { rejectWithValue }) => {
    try {
      // Simulate API call to get user-specific photos from backend
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Backend will return photos where user's face is detected
      const allEvents = initialEvents;
      const userPhotos = [];
      
      allEvents.forEach(event => {
        event.photos.forEach(photo => {
          if (photo.facesDetected && photo.facesDetected.includes(userEmail)) {
            userPhotos.push({
              ...photo,
              eventName: event.name,
              eventDate: event.date,
              eventLocation: event.location
            });
          }
        });
      });
      
      return userPhotos;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downloadPhoto = createAsyncThunk(
  'events/downloadPhoto',
  async ({ photoUrl, filename }, { rejectWithValue }) => {
    try {
      // Simulate photo download
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || `photo-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePhoto = createAsyncThunk(
  'events/deletePhoto',
  async ({ eventId, photoId }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return { eventId, photoId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  events: [],
  userPhotos: [],
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events.push(action.payload);
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Upload Photo
      .addCase(uploadPhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        const { eventId, photo } = action.payload;
        const event = state.events.find(e => e.id === eventId);
        if (event) {
          event.photos.push(photo);
        }
        state.error = null;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Photo
      .addCase(deletePhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        const { eventId, photoId } = action.payload;
        const event = state.events.find(e => e.id === eventId);
        if (event) {
          event.photos = event.photos.filter(p => p.id !== photoId);
        }
        state.error = null;
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get User Photos
      .addCase(getUserPhotos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPhotos = action.payload;
        state.error = null;
      })
      .addCase(getUserPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Download Photo
      .addCase(downloadPhoto.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(downloadPhoto.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(downloadPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = eventsSlice.actions;
export default eventsSlice.reducer;
