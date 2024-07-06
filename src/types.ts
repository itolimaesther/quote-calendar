
export interface SectionCurrency {
	currency: string;
	exchange_rate: number;
	is_base_currency: boolean;
	customer_currency: string;
}

export interface SectionData {
	basis: string;
	unit_of_measurement: string;
	unit: number;
	rate: number;
	amount: number;
}[]

export interface Section {
	section_name: string;
	section_number: number;
  section_currency: SectionCurrency;
  section_data: SectionData[];
}

export interface Quote {
	id: any;
	quote_title: string;
	quote_date: string;
	sections: Section[];
}



export const initialQuote: Quote = {
	quote_title: "",
	quote_date: "",
	id: "",
	sections: [
		{
			section_name: "",
			section_number: 0,
			section_currency: {
				currency: "",
				exchange_rate: 0,
				is_base_currency: false,
				customer_currency: "",
			},
			section_data: [
				// Initial section_data for the first section
				{
					basis: "",
					unit_of_measurement: "",
					unit: 0,
					rate: 0,
					amount: 0,
				},
			],
		},
	],
};
