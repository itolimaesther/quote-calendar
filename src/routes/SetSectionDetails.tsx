import React, { useState, useEffect } from 'react'
import { ArrowLeftIcon, EyeIcon, ArrowsRightLeftIcon, ChevronDownIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
	updateSection,
	addSectionData,
	// updateQuote,
	setQuoteDate,
	addSection,
	deleteSection,
	createQuote,
} from "../store/quoteSlice";
import { DatePicker } from "rsuite";
import { initialQuote, Quote, SectionData, Section } from "../types";
import QuoteDetails from '../components/QuoteDetails';
import SetCurrency from "../components/SetCurrency"


const SetSectionDetails = () => {
	const navigate = useNavigate();

	const [showModal, setShowModal] = useState<boolean>(false);
	const [sectionData, setSectionData] = useState<SectionData[]>([]);
	const [isEditing, setIsEditing] = useState<boolean[]>([]);
	const dispatch = useDispatch();
	const quoteDate = useSelector(
		(state: any) => state.quotes.currentQuote.quote_date
	);
	const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
	const [selectedQuote, setSelectedQuote] = useState<any>(null);
	const updatedData = useSelector((state: any) => state.quotes.currentQuote);
	const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
	const [localSections, setLocalSections] = useState<Section[]>([
		{
			section_name: "",
			section_number: currentSectionIndex + 1,
			section_currency: {
				currency: "",
				exchange_rate: 0,
				is_base_currency: false,
				customer_currency: "",
			},
			section_data: [
				{
					basis: "",
					unit_of_measurement: "",
					unit: 0,
					rate: 0,
					amount: 0,
				},
			],
		},
	]);
	const [localSectionData, setLocalSectionData] = useState<SectionData[]>([
		{
			basis: "",
			unit_of_measurement: "",
			unit: 0,
			rate: 0,
			amount: 0,
		},
	]);

	useEffect(() => {
		if (updatedData?.sections) {
			setLocalSections(updatedData.sections);
		}
		if (
			updatedData.sections[currentSectionIndex]?.section_data &&
			updatedData.sections[currentSectionIndex].section_data.length > 0
		) {
			setSectionData(updatedData.sections[currentSectionIndex].section_data);
		}
	}, [updatedData]);

	


	const handleInput = (
		event: React.ChangeEvent<HTMLInputElement>,
		sectionIndex: number
	) => {
		const { name, value } = event.target;
		const updatedSections = localSections.map((section, index) =>
			index === sectionIndex ? { ...section, [name]: value } : section
		);
		setLocalSections(updatedSections);
		dispatch(
			updateSection({
				index: sectionIndex,
				section: updatedSections[sectionIndex],
			})
		);
	};

	const handleFieldChange = <K extends keyof SectionData>(
		sectionIndex: number,
		dataIndex: number,
		field: K,
		value: SectionData[K]
	) => {
		const updatedSections = [...localSections];
		const updatedSectionData = [...updatedSections[sectionIndex].section_data];
		updatedSectionData[dataIndex] = {
			...updatedSectionData[dataIndex],
			[field]: value,
		};
		updatedSections[sectionIndex] = {
			...updatedSections[sectionIndex],
			section_data: updatedSectionData,
		};
		setLocalSections(updatedSections);
		dispatch(
			updateSection({
				index: sectionIndex,
				section: updatedSections[sectionIndex],
			})
		);
	};

	const handleAddBasis = (sectionIndex: number) => {
		const newSectionData: SectionData = {
			basis: "",
			unit_of_measurement: "",
			unit: 0,
			rate: 0,
			amount: 0,
		};
		const updatedSections = localSections.map((section, index) =>
			index === sectionIndex
				? {
						...section,
						section_data: [...section.section_data, newSectionData],
				  }
				: section
		);
		setLocalSections(updatedSections);
		dispatch(
			updateSection({
				index: sectionIndex,
				section: updatedSections[sectionIndex],
			})
		);
	};

	const handleDeleteBasis = (sectionIndex: number, dataIndex: number) => {
		const updatedSectionData = [...sectionData];
		updatedSectionData.splice(dataIndex, 1);
		setSectionData(updatedSectionData);
		dispatch(
			updateSection({
				index: sectionIndex,
				section: {
					...localSections[sectionIndex],
					section_data: updatedSectionData,
				},
			})
		);
	};

	const handleAddSection = () => {
		const newSection: Section = {
			section_name: "",
			section_number: currentSectionIndex + 1,
			section_currency: {
				currency: "",
				exchange_rate: 0,
				is_base_currency: false,
				customer_currency: "",
			},
			section_data: [],
		};
		const updatedSections = [...localSections, newSection];
		setLocalSections(updatedSections);
		dispatch(addSection(newSection));
	};

	const handleDeleteSection = (index: number) => {
		const updatedSections = [...localSections];
		updatedSections.splice(index, 1);
		setLocalSections(updatedSections);
		dispatch(deleteSection({ index }));
	};


	const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "quote_date") {
			dispatch(setQuoteDate(value));
		}
	};
	

	const handleShowModal = (sectionIndex: number) => {
		setCurrentSectionIndex(sectionIndex);
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	const handleShowDetailsModal = (quote: any) => {
		setSelectedQuote(quote);
		setShowDetailsModal(true);
	};

	const SaveQuote = (quote: any) => {
		setSelectedQuote(quote);
		setShowDetailsModal(true);
		dispatch(createQuote(updatedData));
	};

	console.log(updatedData, "updated")

	return (
		<div className="p-4 md:p-6 lg:p-8 text-left">
			<div className="flex flex-col bg-[#FAFAFA] p-3 md:flex-row justify-between items-center mb-4 md:mb-6 lg:mb-8">
				<div className="mb-2 md:mb-0">
					<button
						className="flex items-center gap-1 text-[13px] text-gray-300"
						onClick={() => navigate(-1)}
					>
						<ArrowLeftIcon className="w-4" /> Back to quotes
					</button>
					<h2 className="text-lg">
						{updatedData.quote_title}{" "}
						<span className="text-gray-300">[{updatedData.quote_date}]</span>
					</h2>
				</div>
				<div className="flex gap-1 text-[14px]">
					<button className="px-2 py-1 text-gray-400 bg-white border-[1px]">
						Save as draft
					</button>
					<button
						className="flex gap-1 items-center px-2 py-1 opacity-50 bg-[#37B248] text-green-900 border-[1px]"
						onClick={() => handleShowDetailsModal(updatedData)}
					>
						<EyeIcon className="w-4" />
						Preview
					</button>
				</div>
			</div>
			{/* <div> */}
			<div className="flex items-center gap-1">
				<p className="text-[13px] text-gray-500">Change quote time</p>
				<input
					type="date"
					id="quote_date"
					name="quote_date"
					// value={data.quote_date}
					value={quoteDate}
					onChange={handleDateChange}
				/>
			</div>
			{localSections?.map((section: any, sectionIndex: number) => {
				return (
					// Section start her
					<div
						key={sectionIndex}
						className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 "
					>
						<div className="lg:p-0 row-span-2 md:col-span-2">
							<button
								className="w-full text-red-500 text-xs text-right"
								onClick={() => handleDeleteSection(sectionIndex)}
							>
								Remove Section
							</button>
							<div className=" ">
								<form>
									<input
										type="text"
										id="section_name"
										name="section_name"
										className={`shadow-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
										placeholder="Enter Section label"
										value={localSections[sectionIndex]?.section_name}
										onChange={(e) => handleInput(e, sectionIndex)}
									/>
								</form>
								<div className="border-[1px] mt-4 rounded-md p-4 md:p-3">
									<table className="w-full">
										<thead>
											<tr className="bg-gray-50 border-b border-gray-200 text-[9px] leading-4 text-gray-500 uppercase tracking-wider">
												<th className="py-2 px-2 text-left font-medium">
													Basis
												</th>
												<th className="py-2 px-2 text-left font-medium">
													Unit of measure
												</th>
												<th className="py-2 px-2 text-left font-medium">
													Unit
												</th>
												<th className="py-2 px-2 text-left font-medium">
													Rate USD
												</th>
												<th className="py-2 px-2 text-left font-medium">
													Amount
												</th>
												<th className="py-2 px-2 text-left font-medium"></th>
											</tr>
										</thead>
										<tbody>
											{section?.section_data.map(
												(data: any, dataIndex: number) => (
													<tr
														key={dataIndex}
														className="border-y-8 border-white"
													>
														<td>
															<input
																type="text"
																className="w-full px-3 py-2 border-r border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
																placeholder="Enter basis"
																value={data.basis}
																onChange={(e) =>
																	handleFieldChange(
																		sectionIndex,
																		dataIndex,
																		"basis",
																		e.target.value
																	)
																}
															/>
														</td>
														<td>
															<select
																value={data.unit_of_measurement}
																className="w-full px-3 py-2 border-r border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
																onChange={(e) =>
																	handleFieldChange(
																		sectionIndex,
																		dataIndex,
																		"unit_of_measurement",
																		e.target.value
																	)
																}
															>
																<option value="" disabled>
																	Select
																</option>
																<option value="Kilogram">Kilogram</option>
																<option value="Meter">Meter</option>
																<option value="Meter">Liter</option>
															</select>
														</td>
														<td>
															<input
																type="number"
																value={data.unit}
																className="w-full px-3 py-2 border-r border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
																onChange={(e) =>
																	handleFieldChange(
																		sectionIndex,
																		dataIndex,
																		"unit",
																		parseInt(e.target.value, 10)
																	)
																}
															/>
														</td>
														<td>
															<input
																type="number"
																value={data.rate}
																className="w-full px-3 py-2 border-r border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
																onChange={(e) =>
																	handleFieldChange(
																		sectionIndex,
																		dataIndex,
																		"rate",
																		parseFloat(e.target.value)
																	)
																}
															/>
														</td>
														<td>
															<input
																type="number"
																value={data.amount}
																className="w-full px-3 py-2 border-r border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
																onChange={(e) =>
																	handleFieldChange(
																		sectionIndex,
																		dataIndex,
																		"amount",
																		parseFloat(e.target.value)
																	)
																}
															/>
														</td>
														<td>
															<button
																onClick={() =>
																	handleDeleteBasis(sectionIndex, dataIndex)
																}
															>
																<TrashIcon className="w-4 text-red-600" />
															</button>
														</td>
													</tr>
												)
											)}
										</tbody>
										<div className="mt-4 text-xs ">
											<button
												className="flex items-center gap-1 text-green-700"
												onClick={() => handleAddBasis(sectionIndex)}
											>
												{" "}
												<PlusIcon className="w-[15px] text-white bg-green-700 p-[1px] rounded-sm" />{" "}
												Add new basis
											</button>
										</div>
									</table>
								</div>
							</div>
						</div>
						<div className=" border-[1px] rounded-md p-4 md:p-6 lg:p-6 row-span-3 h-72">
							<div className="flex justify-between items-center border-b pb-4">
								<p className="text-base">Section Currency</p>
								<p className="text-[13px] text-gray-500">
									{section?.section_currency?.currency}
								</p>
							</div>
							<div className="flex justify-between items-center border-b py-4">
								<p className="text-base">Currency & Rate</p>
							</div>
							<div className="flex gap-3 items-center border-b py-4">
								<div className="border-2 p-1 w-16 h-10">
									<p>{section?.section_currency?.currency}</p>
								</div>
								<ArrowsRightLeftIcon className="w-6  " />
								<div className="border-2 p-2 w-full h-10">
									<p>{section?.section_currency?.exchange_rate}</p>
								</div>
							</div>
							<button
								className="w-full rounded-md p-2 text-gray-600 bg-[#F3F4F6] mt-4"
								onClick={() => handleShowModal(sectionIndex)}
							>
								Edit section currency
							</button>
						</div>
					</div>
					// Section ends here
				);
			})}
			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
				<div className="lg:p-0 row-span-2 md:col-span-2">
					<div className="mt-4 border-t py-6">
						<button
							className="w-full text-xs p-2 bg-green-100 rounded-md flex justify-center items-center text-center gap-1 text-green-700"
							onClick={handleAddSection}
						>
							{" "}
							<PlusIcon className="w-[15px] text-white bg-green-700 p-[1px] rounded-sm" />{" "}
							Add new section
						</button>
					</div>
					<div className="flex justify-between items-center">
						<button className="px-2 py-[7px] rounded-md text-red-500 bg-white border-red-400  border-[1px]">
							Cancle
						</button>
						<button
							className="px-2 py-[7px] bg-green-800 rounded-md text-white "
							onClick={() => SaveQuote(updatedData)}
						>
							Save Quote
						</button>
					</div>
				</div>
				<div></div>
			</div>
			<SetCurrency
				showModal={showModal}
				setShowModal={setShowModal}
				onClose={handleClose}
				sectionIndex={currentSectionIndex}
			/>
			{selectedQuote && ( // Render QuoteDetails only if selectedQuote is truthy
				<QuoteDetails
					showDetailsModal={showDetailsModal}
					setShowDetailsModal={setShowDetailsModal}
					onClose={() => setShowDetailsModal(false)}
					quote={selectedQuote}
				/>
			)}
		</div>
	);
};

export default SetSectionDetails