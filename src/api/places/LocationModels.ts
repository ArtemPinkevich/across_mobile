export interface TransportationOrderRouteResultDto {
	departurePoint: RoutePointDto;
	destinationPoint: RoutePointDto;
	routePoints: RoutePointDto[];
}

export interface RoutePointDto {
	latitude: string;
	longitude: string;
	updatedDateTime: string;
}
