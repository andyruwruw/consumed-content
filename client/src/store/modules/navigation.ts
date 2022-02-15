// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import router from '../../router';

/*
  Navigation Module

  In order to maintain the Vuex store as the center of logic, and keep
  the components soley as methods of displaying the data, all components
  will use the navigation module to route to various pages

  The navigation module will manage the current page and provide getters
  to turn on and off various styles.
*/

// State interface
export interface NavigationState {
  currentPage: string;
}

// Default state
export const defaultState = (): NavigationState => ({
  currentPage: '',
});

// Module state
const moduleState: NavigationState = defaultState();

// Module getters
const getters: GetterTree<NavigationState, any> = {
  /**
   * Whether to apply nav-bar and limit width styles.
   *
   * @param {NavigationState} state Module state.
   * @returns {boolean} Whether the base layout should be used.
   */
  isBaseLayout: (state): boolean => (![
    'Login',
    '404',
    '503',
  ].includes(state.currentPage)),
};

// Module mutations
const mutations: MutationTree<NavigationState> = {
  /**
   * Sets value of current page.
   *
   * @param {NavigationState} state Module state.
   * @param {string} page Page name.
   */
  setCurrentPage(
    state: NavigationState,
    page: string,
  ): void {
    state.currentPage = page;
  },
};

// Module actions
const actions: ActionTree<NavigationState, any> = {
  /**
   * Hard sets page on loading of website.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, any>} payload Action payload.
   * @param {string} payload.page Page name.
   * @param {Record<string, any>} payload.params Additional Parameters.
   */
  setPage({
    commit,
    dispatch,
  }, {
    page,
    params,
  }): void {
    commit('setCurrentPage', page);

    if (page === 'Profile') {
      dispatch('profile/getProfile', params.alias, { root: true });
    }
  },

  /**
   * Automatically routes user to Login page if not logged in.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  goToLoginPage({
    commit,
    state,
  }) {
    try {
      if (state.currentPage !== 'Login') {
        router.push('/');
        commit('setCurrentPage', 'Login');
      }
    } catch (error) {
      this.dispatch('goTo503');
    }
  },

  /**
   * Routes to Login page if user is not logged in.
   */
  needsToBeLoggedIn({ commit, rootGetters }) {
    try {
      if (!rootGetters['user/isLoggedIn']) {
        router.push('/');
        commit('setCurrentPage', 'Login');
      }
    } catch (error) {
      this.dispatch('goTo503');
    }
  },

  /**
   * Routes the user to their feed
   */
  goToMyFeed({ commit, rootGetters, state }) {
    try {
      if (state.currentPage !== 'Home' && rootGetters['user/isLoggedIn']) {
        router.push('/home');

        commit('setCurrentPage', 'Home');
      }
    } catch (error) {
      this.dispatch('goTo404');
    }
  },

  /**
   * Routes the user to error page
   */
  goTo404({ commit, state }) {
    try {
      if (state.currentPage !== '404') {
        router.push('/not-found');

        commit('setCurrentPage', 'NotFound');
      }
    } catch (error) {
      router.push('/503');

      commit('setCurrentPage', '503');
    }
  },

  /**
   * Routes the user to error page
   */
  goTo503({ commit, state }) {
    try {
      if (state.currentPage !== '503') {
        router.push('/503');

        commit('setCurrentPage', '503');
      }
    } catch (error) {
      router.push('/not-found');

      commit('setCurrentPage', 'NotFound');
    }
  },
};

// Module
const navigation: Module<NavigationState, Record<string, any>> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default navigation;
