export interface Environment {
	/**
	 * Whether or not this environment should be used as the default
	 */
	default?: boolean;

	/**
	 * The name of the environment
	 */
	name: string;

	/**
	 * The API endpoint URL for the environment
	 */
	url: string;

	firebaseConfig: any;
}

interface Environments {
	[K: string]: Environment;
}

export const ENVIRONMENTS: Environments = {
	PRODUCTION: {
		default: true,
		name: 'Production',
		url: 'https://cms.ply.life/api/v1',
		firebaseConfig: {
			apiKey: 'AIzaSyCBSwGrpLTjeMo2mRNi-ylG14MGsJsfnew',
			authDomain: 'ply-app-307211.firebaseapp.com',
			projectId: 'ply-app-307211',
			storageBucket: 'ply-app-307211.appspot.com',
			messagingSenderId: '473551803959',
			appId: '1:473551803959:web:1ef17eb426d0a4c65891b2',
			measurementId: 'G-WKYB9JWVQR',
		},
	},
	STAGING: {
		name: 'Staging',
		url: 'https://ply-staging.k8s.reveal.digital/api/v1',
		firebaseConfig: {
			apiKey: 'AIzaSyCBSwGrpLTjeMo2mRNi-ylG14MGsJsfnew',
			authDomain: 'ply-app-307211.firebaseapp.com',
			projectId: 'ply-app-307211',
			storageBucket: 'ply-app-307211.appspot.com',
			messagingSenderId: '473551803959',
			appId: '1:473551803959:web:1ef17eb426d0a4c65891b2',
			measurementId: 'G-WKYB9JWVQR',
		},
	},
	LOCAL: {
		name: 'Local',
		url: 'https://localhost/api/v1',
		firebaseConfig: null,
	},
};
