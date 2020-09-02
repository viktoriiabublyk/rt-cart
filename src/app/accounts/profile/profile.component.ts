import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {AuthState} from '../../auth/auth.state';
import {User} from '../../auth/auth.model';
import {Settings} from '../../../conf/settings';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {

    public dateJoined: string;

    @Select(AuthState.user) user$: Observable<User>;

    constructor(
        private settings: Settings,
        private title: Title,
    ) {
    }

    ngOnInit() {
        this.title.setTitle(this.settings.formatTitle('Profile'));
    }

}
