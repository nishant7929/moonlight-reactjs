import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../shared/types';

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState = {
	user: null,
	loading: true,
} as AuthState;

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.loading = false;
		},
	},
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
