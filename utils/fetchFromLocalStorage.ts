"use client"

export const fetchFromLocalStorage = (key: any) => {

  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  } else {
    console.log('we are running on the server');
  }

}
