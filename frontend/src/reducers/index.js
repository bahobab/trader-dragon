import { combineReducers } from "redux";

import generationReducer from "./generation";
import dragonReducer from "./dragon";
import accountReducer from "./account";
import accountDragonsReducer from "./accountDagons";
import accountInfoReducer from "./accountInfo";
import publicDragonsReducer from "./publicDragons";

const rootReducer = combineReducers({
  generation: generationReducer,
  dragon: dragonReducer,
  account: accountReducer,
  accountDragons: accountDragonsReducer,
  accountInfo: accountInfoReducer,
  publicDragons: publicDragonsReducer
});

export default rootReducer;
