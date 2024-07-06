import React, { useState, useEffect } from 'react'
import {
	ArrowDownOnSquareIcon,
	XMarkIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react";
import Conditions from "./Conditions"
import {generatePDF} from "../service/util"

interface QuoteModalProps {
	showDetailsModal: boolean;
	setShowDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
	onClose: () => void;
	quote: any;
}



const QuoteDetails: React.FC<QuoteModalProps> = ({
	showDetailsModal,
  setShowDetailsModal,
	onClose,
	quote,
}) => {

	const [subtotal, setSubtotal] = useState<number>(0);

	const handleDownload = (quote: any) => {
		generatePDF(quote);
	};

	useEffect(() => {
		const calculateSubtotal = (quote: any) => {
			if (quote) {
				quote.sections.forEach((section: any) => {
					section.section_data.forEach((data: any) => {
						setSubtotal(parseFloat(data.amount));
					});
				});
			}
			return subtotal;
		};
		calculateSubtotal(quote);
	}, [quote]);


	console.log("Quote Details", quote);


	return (
		<Dialog className="relative z-10" open={showDetailsModal} onClose={onClose}>
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>
			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-90  items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl 
            transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 
            data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:max-w-full 
            data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-6 w-9/12 my-20  max-w-full h-full duration-300 overflow:hidden "
					>
						{/* Modal Header */}
						<div className="flex p-6 justify-between items-center border-b-[1px] border-gray-200 pb-4">
							<div>
								<h2 className="text-2xl font-semibold ">
									Quote Detail{" "}
									<span className="text-gray-300 font-medium">#34920_fe2</span>
								</h2>
							</div>
							<div className="flex gap-2 justify-center items-center ">
								<button
									className=" rounded-3xl bg-blue-500 px-4 py-1 text-base text-white "
									onClick={() => onClose()}
								>
									Save Quote
								</button>
								{/* Download */}
								<button
									className="text-gray-500 hover:text-gray-700 focus:outline-none"
									onClick={() => handleDownload(quote)}
								>
									<ArrowDownOnSquareIcon className="w-6 h-6" />
								</button>
								<button
									onClick={() => onClose()}
									className="text-gray-500 hover:text-gray-700 focus:outline-none"
								>
									<XMarkIcon className="w-6 h-6" />
								</button>
							</div>
						</div>

						{/* Modal Content */}
						<div className="my-6 space-y-4 p-8 overflow-y-scroll">
							<div className="border-2 rounded-md p-4 border-gray-100 ">
								<div className="grid grid-cols-2 items-center">
									<div>
										{/* Company logo */}
										<img
											src="/oneport.png"
											alt="company-logo"
											height="200"
											width="200"
										/>
									</div>

									<div className="text-right">
										<p className="text-gray-500 text-sm">UAC Building Marina</p>
										<p className="text-gray-500 text-sm">Lagos, Nigeria</p>
										<p className="text-gray-500 text-sm mt-1">100223</p>
									</div>
								</div>

								{/* Client info */}
								<div className="bg-gray-100 p-4 rounded-md mt-6 text-left">
									<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border-b-[1px] py-6 border-gray-200 text-left">
										<div>
											<h2 className="text-base text-gray-400">
												Attention (Customer Name)
											</h2>
											<p>Daniel Alobode</p>
										</div>
										<div>
											<h2 className="text-base text-gray-400">Email Address</h2>
											<p>ample@mail.com</p>
										</div>
										<div>
											<h2 className="text-base text-gray-400">Commodity</h2>
											<p>Electric goods</p>
										</div>
										<div>
											<h2 className="text-base text-gray-400">
												Chargeable weight (KG)
											</h2>
											<p>55.34Kg</p>
										</div>
										<div>
											<h2 className="text-base text-gray-400">
												POL (Port of Loading)
											</h2>
											<p>Lagos City</p>
										</div>
										<div>
											<h2 className="text-base text-gray-400">
												POD (Port of Destination)
											</h2>
											<p>Johannesburg</p>
										</div>
									</div>

									<div className="py-6">
										<h2 className="text-base text-gray-400">
											Collection Address
										</h2>
										<p>
											INNIO Waukesha Gas Engines 8123 116th Street, Suite 300,
											SW Side of Building, Dock 46-50, Pleasant Prairie, WI
											53158
										</p>
									</div>
								</div>

								{/* Invoice Items */}
								{quote.sections.map((section: any) => (
									<div className="-mx-4 mt-8 flow-root sm:mx-0 text-left">
										<div>
											<p className="text-[14px] text-gray-300">
												Quote Breakdown
											</p>
											<h2 className="text-xl uppercase">
												{section.section_name}{" "}
											</h2>
										</div>
										<table className="min-w-full">
											<colgroup>
												<col className="sm:w-1/6" />
												<col className="sm:w-1/6" />
												<col className="sm:w-1/6" />
												<col className="sm:w-1/6" />
												<col className="sm:w-1/6" />
											</colgroup>
											<thead className="border-y border-gray-300 text-gray-900">
												<tr>
													<th
														scope="col"
														className="py-3.5 pl-4 pr-3 text-left text-[12px] font-semibold text-gray-300 sm:pl-0"
													>
														Basis
													</th>
													<th
														scope="col"
														className="hidden px-3 py-3.5 text-right text-[12px] font-semibold text-gray-300 sm:table-cell"
													>
														Unit of Measure
													</th>
													<th
														scope="col"
														className="hidden px-3 py-3.5 text-right text-[12px] font-semibold text-gray-300 sm:table-cell"
													>
														Unit
													</th>
													<th
														scope="col"
														className="py-3.5 pl-3 pr-4 text-right text-[12px] font-semibold text-gray-300 sm:pr-0"
													>
														Rate (USD)
													</th>
													<th
														scope="col"
														className="py-3.5 pl-3 pr-4 text-right text-[12px] font-semibold text-gray-300 sm:pr-0"
													>
														Amount (USD)
													</th>
												</tr>
											</thead>
											<tbody>
												{section.section_data.map((data: any) => (
													<tr className="border-b border-gray-200">
														<td className="max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0">
															<p className="font-medium text-gray-900 capitalize">
																{data.basis}
															</p>
														</td>
														<td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
															{data.unit_of_measurement}
														</td>
														<td className="hidden px-3 py-5 text-right text-sm text-gray-500 sm:table-cell">
															${data.unit}
														</td>
														<td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
															${data.rate}
														</td>
														<td className="py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
															${data.amount}
														</td>
													</tr>
												))}
											</tbody>
											<tfoot>
												<tr>
													<th
														scope="row"
														colSpan={4}
														className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0"
													>
														Subtotal
													</th>
													<td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">
													${subtotal.toFixed(2)}
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
								))}

								<div className="bg-green-900 px-6 py-4 text-[12px] flex gap-3 text-white justify-start items-start rounded-md mt-6 text-left">
									<InformationCircleIcon className="w-16 " />
									<div>
										<p className="pb-4">
											Please note this offer is firm for acceptance within
											48hours, otherwise above offer will be considered as
											invalid. Rates advised is subject to prevailing parallel
											market rate at time of invoice. Freight advised is subject
											to chargeable weight as declared by airline. Above tariff
											is not applicable to non-compliant shipments without Form
											Ms, PAARs.
										</p>

										<p>
											NOTE: duty and tax not inclusive in the rates advised.
											They will be advised when you provide the CIF value and
											H.S code We do trust that this offer meets your
											requirements. Please, contact us if any further
											explanation is required.
										</p>
									</div>
								</div>

								<h2 className="text-xl mt-8 text-left">
									ONEPORT365 TERMS AND CONDITIONS
								</h2>
								<div className="mb-8 mt-2 border-[1px] border-gray-100 rounded-xl px-3">
									<table className="min-w-full text-left  ">
										<thead className="border-b  border-gray-100 text-gray-900"></thead>
										<Conditions />
									</table>
								</div>
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}

export default QuoteDetails
