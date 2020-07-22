import {CHANGE_CITY_NAME} from './mutation-typs'
export default{
    [CHANGE_CITY_NAME](state,value){
        state.cityName=value
    }
}