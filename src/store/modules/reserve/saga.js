import {select, call, put, all, takeLatest} from 'redux-saga/effects'
import {addReserveSucess, updateAmountSucess} from './action'
import api from '../../../services/api'
import history from '../../../services/history';


function* addToReserve ({id}){

  const tripExists = yield select(
    state => state.reserve.find(trip => trip.id === id)
  );

  //Consultando estoque
  const myStock = yield call (api.get, `/stock/${id}`)

  const stockAmount = myStock.data.amount;

  const currentStock = tripExists ? tripExists.amount : 0;

  const amount = currentStock + 1

  if(amount > stockAmount){
    alert('QUantindade maxima atingida')
    return;
  }


  //adcionado viagem em quantindade.
  if(tripExists) {
  

     yield put(updateAmountSucess(id, amount));

  }else{

  const response = yield call(api.get, `trips/${id}`);
    const data = {
      ...response.data,
      amount:1,
    }

  yield put(addReserveSucess(data))
  history.push('/reservas')

  }   
}

function* updateAmount({id,amount}){
  if(amount <= 0) return;

  const myStock = yield call (api.get, `/stock/${id}`);

  const stockAmount = myStock.data.amount;

  if(amount > stockAmount) {
    alert('quantidade maxima atingida')
    return;
  }

  yield put(updateAmountSucess(id, amount))
}

export default all ([
  takeLatest('ADD_RESERVE_REQUEST', addToReserve),
  takeLatest('UPDATE_RESERVE_REQUEST', updateAmount),
  
])
