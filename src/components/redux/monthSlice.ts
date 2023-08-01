import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MonthState {
  selectedMonth: string | null;
}

const initialState: MonthState = {
  selectedMonth: null,
};

const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {
    setSelectedMonth: (state, action: PayloadAction<string | null>) => {
      state.selectedMonth = action.payload;
    },
  },
});

export const { setSelectedMonth } = monthSlice.actions;
export default monthSlice.reducer;
