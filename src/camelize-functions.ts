import { camelize } from 'humps';

export function camelizeColumnNames(data) {
  const template = data[0];
  // console.log('data: ', data);
  // tslint:disable-next-line: forin
  for (const prop in template) {
    const camel = camelize(prop);
    if (!(camel in template)) {
      for (let i = 0; i < data.length; i++) {
        let d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}
