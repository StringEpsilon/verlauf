import { Location } from "../types";
import { createLocation } from "./createLocation";

export function resolveLocation(from: Location, to: string | Location, preserveSearch: boolean = true) {
	return createLocation(
		to,
		null,
		"",
		from,
		preserveSearch
	);
}
