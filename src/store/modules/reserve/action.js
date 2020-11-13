export function addReserveRequest (id){
  return {
    type:'ADD_RESERVE_REQUEST',
      id
  }
}

export function addReserveSucess (trip){
  return {
    type:'ADD_RESERVE_SUCESS',
      trip
  }
}



export function removeReserve(id){
  return {
    type:'REMOVE_RESERVE',
    id,
  }
}

export function updateAmountRequest(id,amount){
  return {
    type:'UPDATE_RESERVE_REQUEST',
    id,
    amount
  }
}

export function updateAmountSucess(id,amount){
  return {
    type:'UPDATE_RESERVE_SUCESS',
    id,
    amount
  }
}