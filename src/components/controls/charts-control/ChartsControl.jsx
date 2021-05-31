import React, { useEffect, useState } from "react";
import { AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from "recharts";
import _ from "lodash";
import "./index.scss";
import moment from "moment";
import { Alert } from 'react-bootstrap';
import v4 from 'uuid/v4'


const ChartsControl = props => {
	const [windowHeight, setWindowHeight] = useState(0);
	const [windowWidth, setWindowWidth] = useState(0);
	const [modifiedData, setModifiedData] = useState(null);

	const updateWindowDimensions = () => {
		setWindowHeight(window.innerHeight);
		setWindowWidth(window.innerWidth);
	};

	const formatData = () => {
		if (props.data) {
			const newData = props.data.map(item => {
				return {
					...item,
					date: moment(item["date"]).format("DD MMM")
				}
			})
			setModifiedData(newData);
		}
	}

	useEffect(() => {
		updateWindowDimensions();
		window.addEventListener("resize", updateWindowDimensions);
	}, []);

	useEffect(() => {
		formatData();
	}, [props.data])


	return (
		<div className="graph-container">
			{modifiedData && !props.errorMessage &&
				<AreaChart width={windowWidth / 1.4} height={windowHeight / 3} data={modifiedData} >
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#328694" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#328694" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis
						dataKey="date"
						tick={{ stroke: "rgba(255, 255, 255, 0.973)", strokeWidth: 0, fontSize: 12 }}
						axisLine={{ stroke: "#328694", opacity: 0.2 }}
					/>
					<YAxis
						tick={{ stroke: "rgba(243, 242, 242, 0.973)", strokeWidth: 0.25, fontSize: 12 }}
						axisLine={{ stroke: "#328694", opacity: 0.2 }}
					/>
					<CartesianGrid strokeDasharray="1 3" horizontal={false} vertical={false} xAxis={false} />
					<Tooltip />
					<Area type="monotone" dataKey="hour" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					<Area type="monotone" dataKey="events" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
				</AreaChart>
			}
			{
				props.errorMessage &&
				<div className="error-message-container">
					<Alert key={v4()} variant={'danger'}>
						{props.errorMessage}
					</Alert>
				</div>
			}
		</div >
	);
};

export default ChartsControl;
