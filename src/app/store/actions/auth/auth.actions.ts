import { createAction, props } from '@ngrx/store';
import { Profile } from '@models/profile.model';


export const authRequestLoginGoogle = createAction(
  '[Auth] authRequestLoginGoogle',
);

export const authRequestAddProfile = createAction(
  '[Auth] authRequestAddProfile',
  props<{ profile: Profile }>()
);

export const authSetProfile = createAction(
  '[Auth] authSetProfile',
  props<{ profile: Profile }>()
);

export const authLogOut = createAction(
  '[Auth] authLogOut'
);

export const setPersistence = createAction(
  '[Auth] setPersistence'
);
