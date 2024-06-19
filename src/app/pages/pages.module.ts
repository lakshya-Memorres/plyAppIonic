import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PageRoutingModule } from './routing.module';
import { ComponentsModule } from '../components/components.module';
import { OnBoardingPage } from '../pages/on-boarding/on-boarding';
import { LoginPage } from '../pages/login/login';
import { LoginAsPage } from '../pages/login-as/login-as';
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
import { MyFavouritesPage } from './my-favourites/my-favourites';
import { HistoryPage } from './history/history';
import { MorePage } from './more/more';
import { HelpSupportPage } from './help-support/help-support';
import { ViewVideoPage } from './view-video/video';
import { AddExercisePage } from './add-exercise/add-exercise';
import { SwapExercisePage } from './swap-exercise/swap-exercise';
import { WorkoutPreviouslyCompletedPage } from './workout-previosuly-completed/workout-previously-completed';
import { MyProfilePage } from './my-profile/my-profile';
import { MyProgressPage } from './my-progress/my-progress';
import { ThanksPage } from './thanks/thanks';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { TermsConditionsPage } from '../pages/terms-conditions/terms-conditions';
import { SubscriptionManagementPage } from '../pages/subscription-management/subscription-management';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AutowidthDirective } from '../services/appAutoWidth';
import { PlyrModule } from 'ngx-plyr';
import { SubscriptionModalPage } from 'src/app/modals/subscription-modal/subscription-modal.page';
import { WorkoutCustom } from '../pages/workout-custom/workout-custom';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		PageRoutingModule,
		ComponentsModule,
		DragDropModule,
		PlyrModule,
	],
	declarations: [
		OnBoardingPage,
		LoginPage,
		LoginAsPage,
		RegisterPage,
		SetUpYourProfilePage,
		ForgotPasswordPage,
		DashboardPage,
		WorkoutCategory,
		WorkoutPage,
		WorkoutCustomisePage,
		WorkoutCurrentPage,
		WorkoutCompletedPage,
		WorkoutPreviouslyCompletedPage,
		WhyPlyPage,
		PaymentThanks,
		MyPlyPage,
		MyFavouritesPage,
		MyProfilePage,
		MyProgressPage,
		HistoryPage,
		MorePage,
		HelpSupportPage,
		ViewVideoPage,
		AddExercisePage,
		SwapExercisePage,
		ThanksPage,
		PrivacyPolicyPage,
		TermsConditionsPage,
		AutowidthDirective,
		SubscriptionManagementPage,
		SubscriptionModalPage,
		WorkoutCustom
	],
})
export class PagesModule {}
