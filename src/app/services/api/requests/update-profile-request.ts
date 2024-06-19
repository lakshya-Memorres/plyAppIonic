import { Motivations } from '../models/motivations';

export interface UpdateProfileRequest {
    name: string;
    email: string;
	gender: string;
	height: string,
	motivations: number[],
	units: string,
	weight: string,
}
