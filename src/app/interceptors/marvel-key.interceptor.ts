import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { md5 } from 'js-md5';

const PUB_KEY = '0f4aa8fd7d4d60a32482f19ad1351e53';
const PRI_KEY = '959c3ed411fc79e5b41b512aa31d5bdbc0da1025';

export const marvelKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const ts = new Date().getTime() / 1000;
  let value: any = {
      ts: ts,
      apikey: PUB_KEY,
      hash: hashKey(ts),
  }

  // on ne peut pas modifer la requète initiale => il faut donc cloner la requète  
  const clone = req.clone({ setParams: value });

  return next(clone);
};

const hashKey= (ts: number) => 
  md5(`${ts}${PRI_KEY}${PUB_KEY}`);

