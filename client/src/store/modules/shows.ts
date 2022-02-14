// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Types
import { IShow } from '../../../../shared/types';

/*
  Shows Module

  The shows module will manage a cache of shows to prevent repeated requests.
*/
  
// State interface
export interface ShowsState extends Record<string, any> {
  shows: Record<string, IShow>;
}
  
// Default state
export const defaultState = (): ShowsState => ({
  shows: {} as Record<string, IShow>,
});
  
// Module state
const state: ShowsState = defaultState();

// Module getters
const getters: GetterTree<ShowsState, any> = {
  /**
   * Retrieves full cache of shows.
   *
   * @param {ShowsState} state Module state.
   * @returns {Record<string, IShow>} Shows by ID.
   */
  getShows: (state): Record<string, IShow> => {
    return state.shows;
  },
};

// Module mutations
const mutations: MutationTree<ShowsState> = {
  /**
   * Adds a show to the cache.
   *
   * @param {ShowsState} state Module state.
   * @param {IShow} show Show to add.
   */
  addShow (
    state: ShowsState,
    show: IShow,
  ): void {
    state.shows[show.id] = show;
  },

  /**
   * Resets the state to default.
   *
   * @param {NavigationState} state Module state.
   */
   reset(state: ShowsState): void {
    const nextState = defaultState();

    for (let field in nextState) {
      state[field] = nextState[field];
    }
  },
};

// Module actions
const actions: ActionTree<ShowsState, any> = {
  /**
   * Retrieves user's saved shows.
   *
   * @param {ActionContext<ShowsState, any>} context Vuex action context.
   */
  getSavedShows ({
    commit,
    dispatch,
  }): void {
  },
};

// Module
const shows: Module<ShowsState, Record<string, any>> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default shows;
