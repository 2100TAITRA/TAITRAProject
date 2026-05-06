import jDataView from "./jdataview.min.js";

export function getPrefilledJDataView(data) {
	return new jDataView(data, 0, undefined, false);
}

window.getPrefilledJDataView = getPrefilledJDataView;