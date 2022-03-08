import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import LocalStorageStore from "../helpers/storage";
import IEncryptedProperties from "../interfaces/security";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const tokenFromStorage: string | false = await LocalStorageStore.getData("_token");

  console.log(localStorage.getItem('_token'));
  console.log(tokenFromStorage);
  // If there is no token clear everything and redirect
  if (!tokenFromStorage) {
      LocalStorageStore.clearLocalStorage();
      return;
      // return NextResponse.redirect('/')
    }
    
    console.log(22222222222);
  // If the expiration time passed then clear everything and redirect
  const tokenEntity: IEncryptedProperties = JSON.parse(tokenFromStorage);
  console.log(tokenEntity.exp, Math.floor(Date.now() / 1000))
  if (tokenEntity.exp < Math.floor(Date.now() / 1000)) {
    LocalStorageStore.clearLocalStorage();
    // return NextResponse.redirect('/')
  }

  return NextResponse.next();
}
