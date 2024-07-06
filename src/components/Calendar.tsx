import React, { useState, useEffect } from "react";
import {
	add,
	eachDayOfInterval,
	endOfMonth,
	endOfWeek,
	format,
	getDay,
	isSameMonth,
	isToday,
	parse,
	startOfToday,
	startOfWeek,
	startOfMonth,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useSelector, useDispatch  } from "react-redux";
import QuoteDrawer from './QuoteDrawer';
import { getQuoteFetch } from "../store/quoteSlice";
import { formatDateToString } from "../service/util";

function Calendar() {
  const today = startOfToday();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const quotes = useSelector((state: any) => state.quotes.quotes);
  const dispatch = useDispatch()

	const colStartClasses = [
		"",
		"col-start-2",
		"col-start-3",
		"col-start-4",
		"col-start-5",
		"col-start-6",
		"col-start-7",
	];

	const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));
	let firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const [backgroundStates, setBackgroundStates] = useState<any>({});

	const daysInMonth = eachDayOfInterval({
		start: startOfWeek(startOfMonth(firstDayOfMonth)),
		end: endOfWeek(endOfMonth(firstDayOfMonth)),
	}).filter((day) => isSameMonth(day, firstDayOfMonth));

	const getPrevMonth = (event: React.MouseEvent<SVGSVGElement>) => {
		event.preventDefault();
		const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
		setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
	};

	const getNextMonth = (event: React.MouseEvent<SVGSVGElement>) => {
		event.preventDefault();
		const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
		setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
	};

	const handleDateClick = (day: any) => {
		setSelectedDate(day);
		setIsDrawerOpen(true);
		setBackgroundStates((prevState: any) => ({
			...prevState,
			[day]: !prevState[day],
		}));
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
  };

useEffect(() => {
	const startDate = startOfMonth(firstDayOfMonth).toISOString();
  const endDate = endOfMonth(firstDayOfMonth).toISOString();
  dispatch(getQuoteFetch({ startDate, endDate }));
}, []);
 
	const getQuoteCountForDay = (day: Date) => {
		const formattedDay = formatDateToString(day);
		return Array.isArray(quotes?.data)
			? quotes.data.filter(
					(quote: any) =>
						formatDateToString(new Date(quote.quote_date)) === formattedDay
			  ).length
			: 0;
	};

	const getQuotesForDay = (day: Date) => {
		const formattedDay = formatDateToString(day);
		return Array.isArray(quotes?.data)
			? quotes.data.filter(
					(quote: any) =>
						formatDateToString(new Date(quote?.quote_date)) === formattedDay
			  )
			: [];
	};

	const getTotalAmountForDay = (day: Date) => {
		const quotesForDay = getQuotesForDay(day);
		return quotesForDay.reduce((total: number, quote: any) => {
			return (
				total +
				quote.sections.reduce((sectionTotal: number, section: any) => {
					return (
						sectionTotal +
						section.section_data.reduce((dataTotal: number, data: any) => {
							return dataTotal + (data.amount || 0);
						}, 0)
					);
				}, 0)
			);
		}, 0);
	};


    

  return (
		<>
			<div className="w-full">
				<div className="flex items-center justify-between">
					<div className="text-left">
						<h2 className=" text-2xl font-semibold ">All Existing quotes</h2>
						<p className="text-sm text-gray-400">View all created quotes</p>
					</div>
					<div className="flex items-center justify-evenly gap-6 sm:gap-3 ">
						<p className="font-semibold text-xl">
							{format(firstDayOfMonth, "MMMM yyyy")}
						</p>
						<div className="flex items-center">
							<ChevronLeftIcon
								className="w-6 h-6 cursor-pointer"
								onClick={getPrevMonth}
							/>
							<ChevronRightIcon
								className="w-6 h-6 cursor-pointer"
								onClick={getNextMonth}
							/>
						</div>
					</div>
				</div>
				<div className="shadow mt-8 ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col rounded-md">
					<div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center  text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
						{days.map((day, idx) => {
							return (
								<div key={idx} className="flex justify-center bg-white py-2">
									{day}
								</div>
							);
						})}
					</div>
					<div className="grid grid-cols-7 lg:h-[600px] gap-px bg-gray-200">
						{daysInMonth.map((day, idx) => {
							const quoteCount = getQuoteCountForDay(day);
							const totalAmount = getTotalAmountForDay(day);
							return (
								<div
									key={idx}
									className={`${
										backgroundStates[idx] ? "bg-gray-800" : "bg-white"
									} p-2 text-left flex flex-col justify-between group hover:bg-gray-700 ${
										colStartClasses[getDay(day)]
									}`}
									onClick={() => handleDateClick(day)}
								>
									<p
										className={`cursor-pointer flex items-center justify-center group-hover:text-white font-semibold h-4 w-4 p-[10px] rounded-md hover:text-white ${
											isSameMonth(day, today)
												? "text-gray-900"
												: "text-gray-400"
										} ${!isToday(day) && "hover:bg-gray-500"} ${
											isToday(day) && "bg-[#005BC2] text-white"
										}`}
									>
										{format(day, "d")}
									</p>
									{quoteCount > 0 && (
										<div className="text-[11px] ">
											<p className="text-left group-hover:text-white">
												{quoteCount} Quotes
											</p>
											<p className="m-0 bg-green-50 px-1 rounded-md">
												Total: ${totalAmount.toFixed(2)}
											</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
					{isDrawerOpen && (
						<QuoteDrawer
							isDrawerOpen={isDrawerOpen}
							setIsDrawerOpen={setIsDrawerOpen}
							closeDrawer={closeDrawer}
							selectedDate={selectedDate as Date}
							quotesPerDay={getQuotesForDay(selectedDate as Date)}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default Calendar