import { Injectable } from '@angular/core';

@Injectable()
export class ExtensionsService {

  constructor() { }

  checkCoverExtension(data) {
    if (data.name.split('.').pop() === 'png' || data.name.split('.').pop() === 'jpg' || data.name.split('.').pop() === 'jpeg') {
      return true;
    } else {
      return false;
    }
  }

  checkImageExtensions(data) {
    const length = data.length;
    let count = 0;
    for(let i = 0; i < length; i++) {
      if (data[i].name.split('.').pop() === 'png' || data[i].name.split('.').pop() === 'jpg' || data[i].name.split('.').pop() === 'jpeg') {
        count++;
      }
    }
    if (count === length) {
      return true;
    } else {
      return false;
    }
  }
  checkVideoExtensions(data) {
    const length = data.length;
    let count = 0;
    for(let i = 0; i < length; i++) {
      if (data[i].name.split('.').pop() === 'mp4' || data[i].name.split('.').pop() === 'mpeg' || data[i].name.split('.').pop() === 'webm') {
        count++;
      }
    }
    if (count === length) {
      return true;
    } else {
      return false;
    }
  }
}
