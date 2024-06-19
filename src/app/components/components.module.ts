import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from './header/header';
import { TextComponent } from './text/text';
import { PlylifeComponent } from './ply-life/ply-life';
import { MainSliderComponent } from './main-slider/main-slider';
import { CategorySliderComponent } from './category-slider/category-slider';
import { TabsComponent } from './tabs/tabs';
import { SubscriptionComponent } from './subscription/subscription';
import { SubscriptionSmallComponent } from './subscription-small/subscription-small';
import { BackButtonComponent } from './back-button/back-button';
import { WorkoutCardComponent } from './workout-card/workout-card';
import { AppButtonComponent } from './app-button/app-button';
import { SlidingExerciseCardComponent } from './sliding-exercise-card/sliding-exercise-card';
import { WorkoutHeaderComponent } from './workout-header/workout-header';
import { DropdownExersiceCardComponent } from './dropdown-exersice-card/dropdown-exersice-card';
import { SetComponent } from './set/set';
import { TimerComponent } from './timer/timer';
import { WorkoutChartComponent } from './workout-chart/workout-chart';
import { WantMoreComponent } from './want-more-cta/want-more-cta';
import { LinkListComponent } from './link-list/link-list';
import { WorkoutCardOptionsComponent } from './workout-card-options/workout-card-options';
import { ContactUsComponent } from './contact-us/contact-us';
import { SwapExerciseCardComponent } from './swap-exercise-card/swap-exercise-card';
import { CategoryCardComponent } from './category-card/category-card';
import { WorkoutRoundComponent } from './workout-round/workout-round';
import { ExerciseCardComponent } from './exersice-card/exersice-card';
import { AddExerciseComponent } from './add-exercise/add-exercise';
import { DeleteAccountModal } from '../modals/delete-account-modal/delete-account-modal'
import { LoggedInAsComponent } from './logged-in-as/logged-in-as-component';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule],
	exports: [
		HeaderComponent,
		TextComponent,
		PlylifeComponent,
		MainSliderComponent,
		CategorySliderComponent,
		TabsComponent,
		SubscriptionComponent,
		SubscriptionSmallComponent,
		BackButtonComponent,
		WorkoutCardComponent,
		AppButtonComponent,
		SlidingExerciseCardComponent,
		WorkoutHeaderComponent,
		DropdownExersiceCardComponent,
		SetComponent,
		WorkoutRoundComponent,
		TimerComponent,
		WorkoutChartComponent,
		WantMoreComponent,
		WorkoutCardOptionsComponent,
		LinkListComponent,
		ContactUsComponent,
		SwapExerciseCardComponent,
		CategoryCardComponent,
		ExerciseCardComponent,
		AddExerciseComponent,
		DeleteAccountModal,
		LoggedInAsComponent,
	],
	declarations: [
		HeaderComponent,
		TextComponent,
		PlylifeComponent,
		MainSliderComponent,
		CategorySliderComponent,
		TabsComponent,
		SubscriptionComponent,
		SubscriptionSmallComponent,
		BackButtonComponent,
		WorkoutCardComponent,
		AppButtonComponent,
		SlidingExerciseCardComponent,
		WorkoutHeaderComponent,
		DropdownExersiceCardComponent,
		SetComponent,
		WorkoutRoundComponent,
		TimerComponent,
		WorkoutChartComponent,
		WantMoreComponent,
		WorkoutCardOptionsComponent,
		LinkListComponent,
		ContactUsComponent,
		SwapExerciseCardComponent,
		CategoryCardComponent,
		ExerciseCardComponent,
		AddExerciseComponent,
		DeleteAccountModal,
		LoggedInAsComponent,
	],
})
export class ComponentsModule {}
