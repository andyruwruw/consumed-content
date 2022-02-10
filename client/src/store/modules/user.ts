import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

import { IUser } from '../../types';

export interface AuthModuleState {
  user: IUser | null;
}

const defaultState = (): AuthModuleState => ({
  user: null,
});

const getters: GetterTree<AuthModuleState, any> = {
  getUser(state) {
    return state.user;
  },
};

const mutations: MutationTree<AuthModuleState> = {
  setUser(state, user) {
    state.user = user;
  },
};

const actions: ActionTree<AuthModuleState, any> = {
};

const module: Module<AuthModuleState, Record<string, any>> = {
  namespaced: true,
  state: defaultState(),
  getters,
  mutations,
  actions,
};

export default module;
