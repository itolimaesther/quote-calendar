import React, { useState } from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initialQuote, Quote } from "../types";
import {
	// updateQuote,
	setQuoteTitle, setQuoteDate
} from "../store/quoteSlice";

interface QuoteModalProps {
	showModal: boolean;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	onClose: () => void;
}

const CreateQuote: React.FC<QuoteModalProps> = ({
	showModal,
  setShowModal,
  onClose,
}) => {
  const dispatch = useDispatch();
	const navigate = useNavigate();
	const quoteTitle = useSelector(
		(state: any) => state.quotes.currentQuote.quote_title
	);
	const quoteDate = useSelector(
		(state: any) => state.quotes.currentQuote.quote_date
	);

  const dataState = useSelector((state: any) => state.quote);
  const [data, setData] = useState<Quote>(initialQuote);



	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "quote_title") {
			dispatch(setQuoteTitle(value));
		} else if (name === "quote_date") {
			dispatch(setQuoteDate(value));
		}
	};
  
 

  const handleNext = () => {
		setShowModal(false); // Close the modal
    onClose(); // Notify the parent component (QuoteDrawer) to not close itself
    navigate("/set-section-details");
	}

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
            data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-6 w-96 max-w-full duration-300"
					>
						{/* Modal Header */}
						<div className="flex justify-between items-center border-b-2 border-gray-200 pb-4">
							<div>
								<h2 className="text-2xl font-semibold">Create New Quote</h2>
								<p className="text-[12px] text-gray-500 text-left">
									Enter quote name and time
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
						<div className="mt-6 space-y-4">
							<form>
								<div className="mb-4">
									<label
										htmlFor="email"
										className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>
										Enter Quote title
									</label>
									<input
										type="text"
										id="quote_title"
										name="quote_title"
										className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										placeholder="Enter quote title here"
										// value={data.quote_title}
										// onChange={handleInputChange}
										value={quoteTitle}
										onChange={handleInputChange}
									/>
								</div>
								<div className="mb-4">
									<label
										htmlFor="email"
										className="block text-left text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>
										Quote Date
									</label>
									<input
										type="date"
										id="quote_date"
										name="quote_date"
										className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
										value={quoteDate}
										onChange={handleInputChange}
									/>
								</div>
								<div className="flex flex-col space-y-4 text-center">
									<button
										className="bg-[#007003] text-white px-4 py-2 rounded-lg hover:bg-green-800 transition duration-300"
										onClick={handleNext}
									>
										Create New Quote
									</button>
									<a
										className="text-xs text-center text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										onClick={() => setShowModal(false)}
									>
										Cancel
									</a>
								</div>
							</form>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default CreateQuote