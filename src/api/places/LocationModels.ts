export interface TransportationOrderRouteResultDto {
	departurePoint: RoutePointDto;
	destinationPoint: RoutePointDto;
	routePoints: RoutePointDto[];
}

export interface RoutePointDto {
	Latitude: string;
	Longitude: string;
	UpdatedDateTime: string;
}
