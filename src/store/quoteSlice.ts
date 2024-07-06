import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Section, Quote, initialQuote, SectionData } from "../types";



interface QuoteState {
	currentQuote: Quote;
	quotes: { data: Quote[] };
	isLoading: boolean;
}

const initialState: QuoteState = {
	quotes: {
		data: [],
	},
	currentQuote: initialQuote,
	isLoading: false,
};

// interface QuoteState {
// 	currentQuote: Quote;
// 	quotes: Quote[];
// 	isLoading: boolean;
// }

// const initialState: QuoteState = {
// 	quotes: [],
// 	currentQuote: initialQuote,
// 	isLoading: false,
// };

const saveState = (state: QuoteState) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem("quoteState", serializedState);
	} catch (err) {
		console.error("Error saving state to localStorage:", err);
	}
};

const loadState = (): QuoteState => {
	try {
		const serializedState = localStorage.getItem("quoteState");
		if (serializedState === null) {
			return initialState;
		}
		return JSON.parse(serializedState) as QuoteState;
	} catch (err) {
		console.error("Error loading state from localStorage:", err);
		return initialState;
	}
};


export const quoteSlice = createSlice({
	name: "quotes",
	initialState: loadState(),
	reducers: {
		getQuoteFetch: (
			state,
			action: PayloadAction<{ startDate: string; endDate: string }>
		) => {
			state.isLoading = true;
		},
		getQuoteSuccess: (state, action: PayloadAction<Quote[]>) => {
			state.quotes.data = action.payload;
			state.isLoading = false;
		},
		getQuoteFail: (state) => {
			state.isLoading = false;
		},
		createQuote: (state, action: PayloadAction<Quote>) => {
			state.isLoading = false;
		},

		createQuoteSuccess: (state, action: PayloadAction<Quote>) => {
			if (!Array.isArray(state.quotes.data)) {
				state.quotes.data = [];
			}
			// Checks if the quote created exist
			const existingIndex = state.quotes.data.findIndex(
				(quote) => quote.id === action.payload.id
			);

			if (existingIndex >= 0) {
				// Update the existing quote
				state.quotes.data[existingIndex] = action.payload;
			} else {
				// Add the new quote
				state.quotes.data.push(action.payload);
			}

			state.isLoading = true;
			saveState(state);
		},
		createQuoteFail: (state) => {
			state.isLoading = false;
		},
		updateSection: (
			state,
			action: PayloadAction<{ index: number; section: Section }>
		) => {
			const { index, section } = action.payload;
			state.currentQuote.sections[index] = section;
		},

		addSectionData: (
			state,
			action: PayloadAction<{ index: number; section_data: SectionData[] }>
		) => {
			const { index, section_data } = action.payload;
			if (state.currentQuote.sections[index]) {
				state.currentQuote.sections[index].section_data = section_data;
			}
			saveState(state); // Save state after updating
		},
		addSection: (state, action: PayloadAction<Section>) => {
			state.currentQuote.sections.push(action.payload);
			saveState(state);
		},
		deleteSection: (state, action: PayloadAction<{ index: number }>) => {
			state.currentQuote.sections.splice(action.payload.index, 1);
			saveState(state);
		},
		setQuoteTitle: (state, action: PayloadAction<string>) => {
			state.currentQuote.quote_title = action.payload;
		},
		setQuoteDate: (state, action: PayloadAction<string>) => {
			state.currentQuote.quote_date = action.payload;
		},
	},
});

export const {
	getQuoteFetch,
	getQuoteSuccess,
	getQuoteFail,
	createQuote,
	createQuoteSuccess,
	createQuoteFail,
	updateSection,
	addSection,
	deleteSection,
	addSectionData,
	setQuoteTitle,
	setQuoteDate,
} = quoteSlice.actions;
export default quoteSlice.reducer;
