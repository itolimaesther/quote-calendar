import React, { useState } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateSection } from "../store/quoteSlice";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface CurrencyModalProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	onClose: () => void;
	sectionIndex: number;
}

const SetCurrency: React.FC<CurrencyModalProps> = ({
	showModal,
	setShowModal,
	onClose,
	sectionIndex,
}) => {
	const dispatch = useDispatch();
	const updatedData = useSelector((state: any) => state.quotes.currentQuote);
	const [isBaseCurrency, setIsBaseCurrency] = useState<boolean>(false);

	const section = updatedData.sections[sectionIndex];
	const sectionCurrency = section ? section.section_currency : null;

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		dispatch(
			updateSection({
				index: sectionIndex,
				section: {
					...updatedData.sections[sectionIndex],
					section_currency: {
						...updatedData.sections[sectionIndex].section_currency,
						[name]: value,
					},
				},
			})
		);
	};

	const handleCheckboxChange = () => {
		setIsBaseCurrency(!isBaseCurrency);
		dispatch(
			updateSection({
				index: sectionIndex,
				section: {
					...updatedData.sections[sectionIndex],
					section_currency: {
						...updatedData.sections[sectionIndex].section_currency,
						is_base_currency: !isBaseCurrency,
					},
				},
			})
		);
	};
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setShowModal(false);
	};

	return (
		<Dialog className="relative z-10" open={showModal} onClose={onClose}>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl 
            transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 
            data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-lg 
            data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-96 max-w-full duration-300"
					>
						{/* <div className="bg-white rounded-lg w-96 max-w-full shadow-lg transform transition-all duration-300"> */}
						{/* Modal Header */}
						<div className="flex p-6 justify-between items-center border-b-[1px] border-gray-200 pb-4">
							<div>
								<h2 className="text-2xl font-semibold">Set Section Currency</h2>
								<p className="text-[12px] text-gray-500 text-left">
									Kindly set a currency and rate
								</p>
							</div>
							<button
								onClick={() => setShowModal(false)}
								className="text-gray-500 hover:text-gray-700 focus:outline-none"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-x"
								>
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</button>
						</div>
						{/* Modal Content */}
						<div className="pb-6">
							<form className="text-left" onSubmit={handleSubmit}>
								<div className="my-6 space-y-4 px-[18px]">
									<div className="mb-4">
										<label
											htmlFor="currency"
											className={`block text-left text-sm font-medium mb-2 text-gray-700 `}
										>
											Select Currency
										</label>
										<div className="mt-2">
											<select
												id="currency"
												name="currency"
												autoComplete="currency"
												className={`shadow-sm rounded-md w-full px-3 py-2 border text-gray-700 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 `}
												value={sectionCurrency ? sectionCurrency.currency : ""}
												onChange={handleChange}
											>
												<option>USD</option>
												<option>GPB</option>
												<option>EUR</option>
												<option>INR</option>
											</select>
										</div>
									</div>
									<div className="mb-4 text-sm leading-6">
										<p className="text-[12px] text-gray-500">
											Is this the base currency?
										</p>
										<div className="relative flex gap-x-3">
											<div className="flex h-6 items-center gap-2">
												<input
													id="base-currency-yes"
													name="base-currency"
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 text-[#139C33] accent-[#139C33] focus:ring-[#139C33]"
													checked={isBaseCurrency}
													// onChange={() => setIsBaseCurrency(!isBaseCurrency)}
													onChange={handleCheckboxChange}
													// onChange={() => {
													// 	setIsBaseCurrency(!isBaseCurrency);
													// 	dispatch(
													// 		updateSection({
													// 			index: 0,
													// 			section: {
													// 				section_currency: {
													// 					...updatedData.sections[sectionIndex]
													// 						.section_currency,
													// 					is_base_currency: !isBaseCurrency,
													// 				},
													// 			},
													// 		})
													// 	);
													// }}
												/>
												<p className="text-gray-500">Yes, it is.</p>
											</div>
											<div className="flex h-6 items-center gap-2">
												<input
													id="base-currency-no"
													name="base-currency"
													type="checkbox"
													className="h-4 w-4 rounded border-gray-300 text-[#139C33] accent-[#139C33] focus:ring-[#139C33]"
													checked={!isBaseCurrency}
													onChange={handleCheckboxChange}
												/>
												<p className="text-gray-500">No</p>
											</div>
										</div>
									</div>
									<div className="mb-4 flex gap-2 justify-center items-start border-b-[1px] border-gray-200 pb-4">
										<InformationCircleIcon className="w-6 h-6" />
										<p className="text-[12px] text-blue-500">
											<span className="text-blue-700 font-bold">Note,</span>{" "}
											Base currency is the currency the customer will make
											payment in.
										</p>
									</div>
									<div className="mb-4">
										<label
											htmlFor="customer_currency"
											className={`block text-left text-sm font-medium mb-2 ${
												isBaseCurrency ? "text-gray-200" : "text-gray-700 "
											}`}
										>
											Customers Currency
										</label>
										<div className="mt-2">
											<select
												id="customer_currency"
												name="customer_currency"
												autoComplete="customer_currency"
												className={`shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
													isBaseCurrency ? "text-gray-200" : "text-gray-700 "
												}`}
												disabled={isBaseCurrency}
												value={
													sectionCurrency
														? sectionCurrency.customer_currency
														: ""
												}
												onChange={handleChange}
											>
												<option>NGN</option>
												<option>USD</option>
											</select>
										</div>
									</div>
								</div>
								<div className="mb-4 border-b-[1px] border-gray-200 px-[18px] pb-4">
									<label
										htmlFor="customer-currency"
										className={`block text-left text-sm font-medium mb-2 ${
											isBaseCurrency ? "text-gray-200" : "text-gray-700"
										}`}
									>
										Enter Rate
									</label>
									<input
										type="text"
										id="exchange_rate"
										name="exchange_rate"
										className={`shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
											isBaseCurrency ? "text-gray-200" : "text-gray-700 "
										}`}
										placeholder="Enter rate"
										value={sectionCurrency ? sectionCurrency.exchange_rate : ""}
										onChange={handleChange}
									/>
								</div>
								<div className="flex flex-col space-y-4 px-[18px]">
									<button
										className="bg-[#1F2937] text-white px-4 py-2 rounded-lg hover:bg-blue-950 transition duration-300"
										onClick={() => setShowModal(false)}
									>
										Set section currency
									</button>
								</div>
							</form>
						</div>

						{/* </div> */}
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};
					

export default SetCurrency