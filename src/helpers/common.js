import moment from 'moment';
import AppStyle from '../assets/styles/AppStyle';
import { setActivityIndicator, setConversationsData } from '../store/slices/appConfigSlice';
import AppConfig from './config';
import Toast from 'react-native-toast-message';
import { ServiceGetUser } from '../services/AuthServices';
import { setUser } from '../store/slices/loginConfigSlice';
import { ServiceGetAllConversations } from '../services/AppService';
import { InAppBrowser } from 'react-native-inappbrowser-reborn';
import { Linking } from 'react-native';

/**
 * Get random package from array.
 * @param {array of pacagkes} items
 * @returns package Item as object
 */
export const getRandomPackageFromArray = items => {
  return items[Math.floor(Math.random() * items.length)];
};

export const paginateData = (array, page_size, page_number) => {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
};

export const getPager = (totalItems, currentPage = 1, pageSize = 15) => {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage, endPage;
  if (totalPages <= 10) {
    // less than 10 total pages so show all
    startPage = 1;
    endPage = totalPages;
  } else {
    // more than 10 total pages so calculate start and end pages
    if (currentPage <= 6) {
      startPage = 1;
      endPage = 10;
    } else if (currentPage + 4 >= totalPages) {
      startPage = totalPages - 9;
      endPage = totalPages;
    } else {
      startPage = currentPage - 5;
      endPage = currentPage + 4;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    i => startPage + i,
  );

  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
  };
};

export const commonStyle = (fontWeight, fontSize, color) => ({
  fontWeight, fontSize, color: AppStyle.colorSet[color]
})

export const commonPageStyle = {
  flex: 1, marginTop: AppConfig.statusBarHeight, backgroundColor: AppStyle.colorSet.BGColor
};

export const convertToFormDataObject = (values) => {
  const formData = new FormData();
  Object.keys(values).forEach(key => {
    formData.append(key, values[key])
  });
  return formData;
}

export const showToastHandler = (e, dispatch = null) => {
  if (dispatch) {
    dispatch(setActivityIndicator(false));
  }
  console.log(e);
  const errors = e?.response?.data?.errors;
  Toast.show({
    type: 'error',
    text1: e?.response?.data?.message || e?.message,
    text2: errors ? errors[Object.keys(errors)[0]][0] : '',
  });
}

export const UpdatedUserInTheApp = (dispatch) => {
  return new Promise((resolve, reject) => {
    ServiceGetUser().then(response => {
      console.log({ response });
      dispatch(setUser(response?.data));
      ServiceGetAllConversations().then(response => {
        console.log({ response });
        dispatch(setConversationsData(response?.data));
      }).catch(e => {
        console.log(e);
      });
      resolve();
    }).catch(e => {
      console.log(e);
      reject();
    })
  });
}

export const openLinkService = async (url) => {
  const openURLSocial = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Toast.show({
            type: 'info',
            text1: 'Issue',
            text2: 'Unable to open the page',
          });
        }
      })
      .catch((error) => console.log(error));
  };

  if (url) {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
      } else {
        openURLSocial(url);
      }
    } catch (error) {
      openURLSocial(url);
    }
  }
}