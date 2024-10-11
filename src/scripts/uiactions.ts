import { ElementRef } from "@angular/core";
import { RegisterPage } from "src/app/register/register.page";
import { TabsPage } from "src/app/tabs/tabs.page";

export class UIActions {
 

    public step(section: number, page: RegisterPage) {
        switch (section) {
            case 1: {
                page.step1?.nativeElement.classList.remove("disbaled-content");
                page.step2?.nativeElement.classList.add("disbaled-content");
                page.step3?.nativeElement.classList.add("disbaled-content");
                page.step4?.nativeElement.classList.add("disbaled-content");

                page.content?.scrollToTop(300);
            }
                break;
            case 2: {
                page.step1?.nativeElement.classList.add("disbaled-content");
                page.step2?.nativeElement.classList.remove("disbaled-content");
                page.step3?.nativeElement.classList.add("disbaled-content");
                page.step4?.nativeElement.classList.add("disbaled-content");

                page.content?.scrollByPoint(0, page.height ?? 0, 300);
            }
                break;
            case 3: {
                debugger
                page.step1?.nativeElement.classList.add("disbaled-content");
                page.step2?.nativeElement.classList.add("disbaled-content");
                page.step3?.nativeElement.classList.remove("disbaled-content");
                page.step4?.nativeElement.classList.add("disbaled-content");

                page.content?.scrollByPoint(0, (page.height ?? 0), 300);

                // page.content?.scrollToBottom(300);
            }
                break;
            case 4: {
                page.step1?.nativeElement.classList.add("disbaled-content");
                page.step2?.nativeElement.classList.add("disbaled-content");
                page.step3?.nativeElement.classList.add("disbaled-content");
                page.step4?.nativeElement.classList.remove("disbaled-content");

                page.content?.scrollByPoint(0, (page.height ?? 0), 300);
            }
                break;

            case 5: {
                page.step1?.nativeElement.classList.add("disbaled-content");
                page.step2?.nativeElement.classList.add("disbaled-content");
                page.step3?.nativeElement.classList.add("disbaled-content");
                page.step4?.nativeElement.classList.remove("disbaled-content");

                page.content?.scrollByPoint(0, -(page.height ?? 0), 300);
            }
                break;
        }
    }

    sing_in(y: boolean, element?: ElementRef) {

        if (y) {
            element?.nativeElement.classList.remove('register-top-size');
            return 'none';
        } else {
            element?.nativeElement.classList.add('register-top-size');
            return 'block';
        }
    }

    open_editor(tabs: TabsPage) {
        tabs.profile_editor?.nativeElement.classList.add("profile-setings-card-large");
        tabs.profile_data?.nativeElement.classList.add("profile-text-data-large");
        tabs.profile_icon?.nativeElement.classList.add("profile-logout-icon-large");
        tabs.profile_fullname?.nativeElement.classList.add("profile-nickname-large");
        tabs.description_display = 'none';
        tabs.logout_button_display = 'none';
        tabs.description_display_large = 'block'
        tabs.icon_name = 'bookmark-outline';
        tabs.is_open = true;
    }

    close_editor(tabs: TabsPage) {
        tabs.profile_editor?.nativeElement.classList.remove("profile-setings-card-large");
        tabs.profile_data?.nativeElement.classList.remove("profile-text-data-large");
        tabs.profile_icon?.nativeElement.classList.remove("profile-logout-icon-large");
        tabs.profile_fullname?.nativeElement.classList.remove("profile-nickname-large");
        tabs.description_display = 'block';
        tabs.logout_button_display = 'flex';
        tabs.description_display_large = 'none'
        tabs.icon_name = 'log-in-outline';
        tabs.is_open = false;
    }
}


