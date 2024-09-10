import { applyMiddleware } from 'redux'
import { legacy_createStore as createStore} from 'redux'
import { thunk } from 'redux-thunk';  
import rootReducer from './reducers/rootReducer'

const initialState = {}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

export default store