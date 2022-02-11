import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

import { IUser } from '../../types';

export interface AuthModuleState {
  user: IUser | null;

  forceNavBarOpen: boolean;
}

const defaultState = (): AuthModuleState => ({
  user: {
    id: 1,
    name: 'Andrew Young',
    private: false,
    image: 'https://media-exp1.licdn.com/dms/image/C5603AQEwnHwJL_dsGQ/profile-displayphoto-shrink_800_800/0/1583544905412?e=1649894400&v=beta&t=Cq-pNr1LQW4e_ENASTYytydRIwAP6vKyX5dhUT-TOCA',
    username: 'andyruwruw',
  },

  forceNavBarOpen: false,
});

const getters: GetterTree<AuthModuleState, any> = {
  getUser(state: AuthModuleState): IUser | null {
    return state.user;
  },
  getUsername(state: AuthModuleState): string | null {
    return state.user ? state.user.username : null;
  },
  isLoggedIn(state: AuthModuleState): boolean {
    return state.user !== null;
  },
  isNavBarOpen(state: AuthModuleState): boolean {
    return state.forceNavBarOpen;
  },
};

const mutations: MutationTree<AuthModuleState> = {
  setUser(
    state: AuthModuleState,
    user: IUser | null,
  ): void {
    state.user = user;
  },
  setForceNavBarOpen(
    state: AuthModuleState,
    forceNavBarOpen: boolean,
  ): void {
    state.forceNavBarOpen = forceNavBarOpen;
  },
};

const actions: ActionTree<AuthModuleState, any> = {
  toggleNavBar({ commit, rootGetters }): void {
    commit('setForceNavBarOpen', !(rootGetters['user/isNavBarOpen']));
  },
};

const module: Module<AuthModuleState, Record<string, any>> = {
  namespaced: true,
  state: defaultState(),
  getters,
  mutations,
  actions,
};

export default module;
