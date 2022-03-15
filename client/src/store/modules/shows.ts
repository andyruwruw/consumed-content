// Packages
import api from '@/api';
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

/*
  Show Module

  The show module manages saved shows.
*/

// State interface
export interface ShowModuleState extends Record<string, any> {
  /**
   * Saved shows
   */
  saved: Record<number, boolean>;
}

// Default state
const defaultState = (): ShowModuleState => ({
  saved: {},
});

// Module state
const moduleState: ShowModuleState = defaultState();

// Module getters
const getters: GetterTree<ShowModuleState, any> = {
  /**
   * Retrieves saved shows.
   *
   * @param {ShowModuleState} state Module state.
   * @returns {IUser | null} Current logged in user.
   */
  getSaved(state: ShowModuleState): Record<number, boolean> {
    return state.saved;
  },
};

// Module mutations
const mutations: MutationTree<ShowModuleState> = {
  /**
   * Sets saved shows.
   *
   * @param {ShowModuleState} state Module state.
   * @param {Record<number, boolean>} saved Saved shows.
   */
  setSaved(
    state: ShowModuleState,
    saved: Record<number, boolean>,
  ): void {
    state.saved = saved;
  },

  add(
    state: ShowModuleState,
    id: number,
  ): void {
    state.saved[id] = true;
  },

  remove(
    state: ShowModuleState,
    id: number,
  ): void {
    state.saved[id] = false;
  },

  /**
   * Resets the state to default.
   *
   * @param {ShowModuleState} state Module state.
   */
  reset(state: ShowModuleState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<ShowModuleState, any> = {
  /**
   * Logs a user out and clears state.
   *
   * @param {ActionContext<ShowModuleState, any>} context Vuex action context.
   */
  async fetchSaved({
    commit,
    rootGetters,
  }): Promise<void> {
    if (!rootGetters['user/isLoggedIn']) {
      return;
    }

    const savedShows = await api.show.userShows(
      rootGetters['user/getUser']?.id,
      '',
    );

    const shows = {} as Record<number, boolean>;

    for (let i = 0; i < savedShows.length; i += 1) {
      shows[savedShows[i].id] = true;
    }

    commit('setSaved', shows);
  },

  async like({
    commit,
  }, {
    id,
  }) {
    console.log('liking', id);
    await api.show.add(id);
    commit('add', id);
  },

  async unlike({
    commit,
  }, {
    id,
  }) {
    console.log('unlike', id);
    await api.show.remove(id);
    commit('remove', id);
  },
};

// Module
const shows: Module<ShowModuleState, Record<string, any>> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default shows;
