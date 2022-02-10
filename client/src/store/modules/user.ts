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
  user: {
    id: 1,
    name: 'Andrew Young',
    private: false,
    image: 'https://media-exp1.licdn.com/dms/image/C5603AQEwnHwJL_dsGQ/profile-displayphoto-shrink_800_800/0/1583544905412?e=1649894400&v=beta&t=Cq-pNr1LQW4e_ENASTYytydRIwAP6vKyX5dhUT-TOCA',
    username: 'andyruwruw',
  },
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
