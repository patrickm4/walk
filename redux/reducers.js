//update the state variable
const pageDefault = {
  page:1,
  centralPage:99,
  dangerModal : false,
  eventModal: false,
  dShowCrimes: false,
  dShowEvents: false,
  anyCrimetoShow: true,
  anyEventtoShow: true,
  currentUserId: 0,
  currentUserCname: "No Name Saved",
  currentUserCphone:"",
  currentCmsg: "No Message Saved",
  currentUserHomeInfo: "No Address Saved",
  showTips: true,
};

export function Page(state = pageDefault, action){
  let obj = Object.assign({}, state);

  switch(action.type) {
    case "CHANGE_PAGE":
      obj.page = action.curpage;
      return obj;
    case "CHANGE_DISPLAY":
      obj.centralPage = action.curdisplay;
      return obj;
    case "TOGGLE_CRIMES":
      obj.dShowCrimes = action.dShowCrimes;
      return obj;
    case "TOGGLE_EVENTS":
      obj.dShowEvents = action.dShowEvents;
      return obj;
    case "TOGGLE_CRIMESHOW":
      obj.anyCrimetoShow = action.anyCrimetoShow;
      return obj;
    case "TOGGLE_EVENTSHOW":
      obj.anyEventtoShow = action.anyEventtoShow;
      return obj;
    case "CHANGE_DMODAL":
    obj.dangerModal = action.dangerModal;
      return obj;
    case "CHANGE_EMODAL":
    obj.eventModal = action.eventModal;
      return obj;
    case "CHANGE_SHOWTIPS":
    obj.showTips = action.showTips;
        return obj;
    default:
      return state;
  }
}

const profileDefault = {
  userFullname: "Default",
}

export function Fullname(state = profileDefault, action){
  let obj = Object.assign({}, state);

  switch(action.type) {
    case "CHANGE_NAME":
      obj.userFullname = action.userFullname;
      return obj;
    case "CHANGE_CURRENTID":
        obj.currentUserId = action.currentUserId;
        return obj;
    case "INCLUDE_USERHOMEINFO":
        obj.currentUserHomeInfo = action.currentUserHomeInfo;
        return obj;
    case "CHANGE_USERCONTACT_NAME":
        obj.currentUserCname = action.currentUserCname;
        return obj;
    case "CHANGE_USERCONTACT_PHONE":
        obj.currentUserCphone = action.currentUserCphone;
        return obj;
    case "CHANGE_USERCONTACT_MSG":
        obj.currentCmsg = action.currentCmsg;
        return obj;
    default:
      return state;
    }
}
