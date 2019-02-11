//building functions to change the global state
export function ChangePage(page){
  return {
    type:"CHANGE_PAGE",
    curpage:page,
  }
}

export function ChangeDisplay(centralPage){
  return {
    type:"CHANGE_DISPLAY",
    curdisplay: centralPage,
  }
}

export function ChangeDangerModal(dangerModal){
  return {
    type:"CHANGE_DMODAL",
    dangerModal: dangerModal,
  }
}

export function ChangeEventModal(eventModal){
  return {
    type:"CHANGE_EMODAL",
    eventModal: eventModal,
  }
}

export function ChangeNameToUser(userFullname){
  return {
    type:"CHANGE_NAME",
    userFullname: userFullname,
  }
}

export function ChangeCrimeBool(dShowCrimes){
  return {
    type:"TOGGLE_CRIMES",
    dShowCrimes: dShowCrimes,
  }
}

export function ChangeEventBool(dShowEvents){
  return {
    type:"TOGGLE_EVENTS",
    dShowEvents: dShowEvents,
  }
}

export function ChangeCurrentId(currentUserId){
  return{
    type:"CHANGE_CURRENTID",
    currentUserId: currentUserId
  }
}

export function DisplayUserHomeInfo(currentUserHomeInfo){
  return{
    type:"INCLUDE_USERHOMEINFO",
    currentUserHomeInfo: currentUserHomeInfo
  }
}

export function ChangeCrimetoShow(anyCrimetoShow){
  return {
    type:"TOGGLE_CRIMESHOW",
    anyCrimetoShow: anyCrimetoShow,
  }
}

export function ChangeEventtoShow(anyEventtoShow){
  return {
    type:"TOGGLE_EVENTSHOW",
    anyEventtoShow: anyEventtoShow,
  }
}

export function ChangeShowTips(showTips){
  return {
    type:"CHANGE_SHOWTIPS",
    showTips: showTips,
  }
}

export function ChangeUserCName(currentUserCname){
  return {
    type:"CHANGE_USERCONTACT_NAME",
    currentUserCname: currentUserCname,
  }
}

export function ChangeUserCPhone(currentUserCphone){
  return {
    type:"CHANGE_USERCONTACT_PHONE",
    currentUserCphone: currentUserCphone,
  }
}

export function ChangeUserCMsg(currentCmsg){
  return {
    type:"CHANGE_USERCONTACT_MSG",
    currentCmsg: currentCmsg,
  }
}
