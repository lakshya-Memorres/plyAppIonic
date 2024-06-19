import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SetUpYourProfilePage } from '../pages/setup-your-profile/setup-your-profile';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { WorkoutCategory } from '../pages/workout-category/workout-category';
import { WorkoutPage } from '../pages/workout/workout';
import { WorkoutCustomisePage } from '../pages/workout-customise/workout-customise';
import { WorkoutCurrentPage } from '../pages/workout-current/workout-current';
import { WorkoutCompletedPage } from '../pages/workout-completed/workout-completed';
import { WhyPlyPage } from './why-ply/why-ply';
import { PaymentThanks } from './payment-thanks/payment-thanks';
import { MyPlyPage } from './my-ply/my-ply';
import { MyProfilePage } from './my-profile/my-profile';
import { MyFavouritesPage } from './my-favourites/my-favourites';
import { HistoryPage } from './history/history';
import { MorePage } from './more/more';
import { HelpSupportPage } from './help-support/help-support';
import { ViewVideoPage } from './view-video/video';
import { AddExercisePage } from './add-exercise/add-exercise';
import { SwapExercisePage } from './swap-exercise/swap-exercise';
import { WorkoutPreviouslyCompletedPage } from './workout-previosuly-completed/workout-previously-completed';
import { MyProgressPage } from './my-progress/my-progress';
import { ThanksPage } from './thanks/thanks';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsConditionsPage } from '../pages/terms-conditions/terms-conditions';
import { SubscriptionManagementPage } from '../pages/subscription-management/subscription-management';
import { LoginAsPage } from './login-as/login-as';
import { WorkoutCustom } from '../pages/workout-custom/workout-custom';

const routes: Routes = [
	{
		path: '',
		component: LoginPage,
	},
	{
		path: 'login-as',
		component: LoginAsPage,
	},
	{
		path: 'on-boarding',
		component: OnBoardingPage,
	},
	{
		path: 'register',
		component: RegisterPage,
	},
	{
		path: 'setup-your-profile',
		component: SetUpYourProfilePage,
	},
	{
		path: 'forgot-password',
		component: ForgotPasswordPage,
	},
	{
		path: 'dashboard',
		component: DashboardPage,
	},
	{
		path: 'workout/:id',
		component: WorkoutPage,
	},
	{
		path: 'custom-workouts',
		component: WorkoutCustom,
	},
	{
		path: 'workout-category/:id',
		component: WorkoutCategory,
	},
	{
		path: 'customise-workout/:id',
		component: WorkoutCustomisePage,
	},
	{
		path: 'current-workout/:id',
		component: WorkoutCurrentPage,
	},
	{
		path: 'completed-workout/:slug',
		component: WorkoutCompletedPage,
	},
	{
		path: 'previously-completed-workout/:id',
		component: WorkoutPreviouslyCompletedPage,
	},
	{
		path: 'why-ply',
		component: WhyPlyPage,
	},
	{
		path: 'payment-thanks',
		component: PaymentThanks,
	},
	{
		path: 'my-ply',
		component: MyPlyPage,
	},
	{
		path: 'my-profile',
		component: MyProfilePage,
	},
	{
		path: 'my-favourites',
		component: MyFavouritesPage,
	},
	{
		path: 'my-progress',
		component: MyProgressPage,
	},
	{
		path: 'history',
		component: HistoryPage,
	},
	{
		path: 'more',
		component: MorePage,
	},
	{
		path: 'help-and-support',
		component: HelpSupportPage,
	},
	{
		path: 'video/:id',
		component: ViewVideoPage,
	},
	{
		path: 'add-exercise/:id',
		component: AddExercisePage,
	},
	{
		path: 'swap-exercise/:id',
		component: SwapExercisePage,
	},
	{
		path: 'thanks',
		component: ThanksPage,
	},
	{
		path: 'privacy-policy',
		component: PrivacyPolicyPage,
	},
	{
		path: 'terms-conditions',
		component: TermsConditionsPage,
	},
	{
		path: 'subscription-management',
		component: SubscriptionManagementPage,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PageRoutingModule {}
