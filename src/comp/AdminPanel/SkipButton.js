import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			borderColor: "white",
			color: "white",
			transition: "0.3s",
			"&:hover": {
				borderColor: "#f94144",
				color: "#f94144",
			},
		},
	},
}));

export default function OutlinedButtons({ text, onClick, style }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Button
				onClick={onClick && onClick}
				style={style && style}
				variant="outlined"
			>
				{text ? text : "Enter text"}
			</Button>
		</div>
	);
}
