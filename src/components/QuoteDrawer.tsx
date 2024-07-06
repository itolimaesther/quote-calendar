import React, {useState} from 'react'
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	TransitionChild,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { formatDateToString } from "../service/util"
import CreateQuote from "./Createquote"
import QuoteDetails from "./QuoteDetails"



interface QuoteDrawerProps {
	isDrawerOpen: boolean;
	setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	closeDrawer: () => void;
	selectedDate: Date;
	quotesPerDay: any[];
}

const QuoteDrawer: React.FC<QuoteDrawerProps> = ({
	isDrawerOpen,
	selectedDate,
	setIsDrawerOpen,
	closeDrawer,
	quotesPerDay,
}) => {
	const formattedString = formatDateToString(selectedDate);
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
	const [selectedQuote, setSelectedQuote] = useState<any>(null);

	const handleShowModal = () => {
		setShowModal(true)
	}

	const handleShowDetailsModal = (quote: any) => {
		setSelectedQuote(quote); // Set the selected quote details
		setShowDetailsModal(true);
	};

	const handleCloseDrawer = () => {
		setShowModal(false); // Close only the modal, not the drawer
	};

	const calculateTotalAmount = (sections: any[]) => {
		if (!Array.isArray(sections)) return 0;
		return sections.reduce((total, section) => {
			if (!Array.isArray(section.section_data)) return total;
			const sectionTotal = section.section_data.reduce(
				(sectionTotal: any, data: any) => sectionTotal + (data.amount || 0),
				0
			);
			return total + sectionTotal;
		}, 0);
	};
	
	const formatTime = (dateString: string) => {
		const date = new Date(dateString);
		return date
			.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			})
			.toUpperCase();
	};





	console.log(quotesPerDay, "quotesPerDay");


	if (!isDrawerOpen) {
		return null;
	}
	return (
		<Dialog className="relative z-10" open={isDrawerOpen} onClose={closeDrawer}>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
			/>

			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 mt-38 lg:mt-38 sm:mt-20 right-0 flex max-w-full pl-10">
						<DialogPanel
							transition
							className="pointer-events-auto relative max-w-md w-80 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
						>
							<div className="flex h-full  flex-col overflow-y-scroll bg-gray-800 py-6 shadow-xl">
								<div className="px-4 sm:px-6 flex ">
									<DialogTitle className="text-[13px] font-semibold leading-6 w-full text-white flex justify-between">
										<div className="flex gap-1 justify-start">
											<p className="text-[#3B82F6]">{formattedString}</p>
										</div>
										<span>55º/40º☀️</span>
									</DialogTitle>
									<TransitionChild>
										<div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
											<button
												type="button"
												className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
												onClick={() => setIsDrawerOpen(false)}
											>
												<span className="absolute -inset-2.5" />

												<span className="sr-only">Close panel</span>
												{/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
											</button>
										</div>
									</TransitionChild>
								</div>
								<div className="relative mt-6 flex-1 px-4 sm:px-6">
									{quotesPerDay?.map((quote) => {
										const totalAmount = calculateTotalAmount(quote.sections);
										const time = formatTime(quote.createdAt);

										return (
											<div
												className="flex justify-between mb-1 cursor-pointer items-start text-[13px] rounded-md p-1 text-white hover:bg-gray-300"
												onClick={() => handleShowDetailsModal(quote)}
											>
												<div className="border-l-4 border-slate-600 pl-2 ">
													<div className="flex justify-start items-start gap-1">
														<p className="text-[#D0F5FF]">${totalAmount}</p>
														{/* <p className="bg-gray-400 px-1 m-0 text-[#D0F5FF] rounded-md ">
															Draft
														</p> */}
													</div>
													<p className="text-[#3B82F6]">{quote.quote_title}</p>
												</div>
												<time className="bg-gray-400 px-1 text-[#D0F5FF] rounded-md ">
													{time}
												</time>
											</div>
										);
									})}
									<button
										className="w-full bg-white rounded-md py-2 font-semibold flex justify-center items-center"
										onClick={handleShowModal}
									>
										{" "}
										<PlusIcon className="w-4" /> Add new quote
									</button>
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
			<CreateQuote
				showModal={showModal}
				setShowModal={setShowModal}
				onClose={handleCloseDrawer}
			/>
			{selectedQuote && ( // Render QuoteDetails only if selectedQuote is truthy
				<QuoteDetails
					showDetailsModal={showDetailsModal}
					setShowDetailsModal={setShowDetailsModal}
					onClose={() => setShowDetailsModal(false)}
					quote={selectedQuote} 
				/>
			)}
		</Dialog>
	);
};

export default QuoteDrawer