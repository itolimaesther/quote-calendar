import React from "react";

const Conditions = () => {
	const termsAndConditions = [
		{
			id: 1,
			content: "Above quote is/are subject to VAT.",
		},
		{
			id: 2,
			content:
				"Above quoted rates are on Door-to-Door basis excludes of Duties at the time of exports.",
		},
		{
			id: 3,
			content: "Standard Trading Terms and Conditions of Oneport365 applies.",
		},
		{
			id: 4,
			content:
				"Above rates excludes services like packing, re-packing, Customs Inspection etc which may be charged additional(if required) with prior customer approval.",
		},
		{
			id: 5,
			content: "Above rates do not cover Insurance charges.",
		},
		{
			id: 6,
			content:
				"Above rates does not include any additional services required e.g.- special handling, week-end pick-up/delivery which has not been agreed and same will be charged as mutually agreed before services are rendered.",
		},
	];

	return (
		<tbody>
			{termsAndConditions.map((item) => (
				<tr key={item.id} className="border-b border-gray-100">
					<td className="py-2 border-r w-14 border-gray-100 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
						{item.id}.
					</td>
					<td className="py-2 pl-3 pr-4 text-sm text-gray-900 sm:pr-0">
						{item.content}
					</td>
				</tr>
			))}
		</tbody>
	);
};

export default Conditions;
