import {
	put,
	takeEvery,
	call,
	CallEffect,
	PutEffect,
} from "redux-saga/effects";
import {
	getQuoteSuccess,
	createQuoteSuccess,
	createQuoteFail,
} from "./quoteSlice";

interface Quote {
	id: number;
	text: string;
	author: string;
}

interface FetchQuotesAction {
	type: string;
	payload: {
		startDate: string;
		endDate: string;
	};
}

interface CreateQuoteAction {
	type: string;
	payload: Quote;
}

// Saga Generator function to fetch quotes
function* getQuoteFetchSaga(
	action: FetchQuotesAction
): Generator<CallEffect | PutEffect, void, any> {
	const { startDate, endDate } = action.payload;
	try {
		const quotes: any = yield call(() =>
			fetch(
				`https://test-api.oneport365.com/api/admin/quotes/assessment/get?start_date=${startDate}&end_date=${endDate}`
			)
		);
		const data = yield quotes.text();
		const quoteData = JSON.parse(data);
		yield put(getQuoteSuccess(quoteData.data));
	} catch (error) {
		console.error("Failed to fetch quotes", error);
	}
}

// Saga Generator function to create new quote
function* createQuoteSaga(
	action: CreateQuoteAction
): Generator<CallEffect | PutEffect, void, any> {
	try {
		const response: any = yield call(() =>
			fetch(
				"https://test-api.oneport365.com/api/admin/quotes/assessment/create",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(action.payload),
				}
			)
    );
		const data = yield response.json();
		yield put(createQuoteSuccess(data.data));
		console.log(data.data, "data");//gives the new data
	} catch (error) {
		console.error("Failed to create quote", error);
		yield put(createQuoteFail());
	}
}



function* quoteSaga() {
  yield takeEvery("quotes/getQuoteFetch", getQuoteFetchSaga);
  yield takeEvery("quotes/createQuote", createQuoteSaga);
}

export default quoteSaga;
