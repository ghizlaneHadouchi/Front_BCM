import { combineReducers, legacy_createStore as createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const initialState = {
  currentUser: null,
  sidebarShow: true,
  notification: 0,
  notificationMessage: [],
}

const changeState = (state = initialState.sidebarShow, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...rest }
    default:
      return state
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state,
        currentUser: action.payload.user,
      }
    case 'signOut':
      return { ...initialState, currentUser: null }
    case 'setNotifications':
      return {
        ...state,
        notification: action.payload.notifications,
        notificationMessage: action.payload.notificationMessage,
      }
    case 'addNotification':
      return {
        ...state,
        notification: state.notification + 1,
        notificationMessage: [...state.notificationMessage, action.payload],
      }
    case 'clearNotification':
      return {
        ...state,
        notification: 0,
      }
    case 'removeNotification':
      return {
        ...state,
        notification: state.notification - 1,
        notificationMessage: state.notificationMessage.filter(
          (msg) => msg.feeCode !== action.payload.feeCode,
        ),
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer,
  theme: changeState,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)

export const persistor = persistStore(store)

export default store
