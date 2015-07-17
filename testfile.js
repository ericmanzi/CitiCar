var userString = '{"username":"RgtyRXx3lESbcgmVHVgWLhSgH","authData":{"facebook":{"access_token":"CAAXB1bSZCBC4BADNwYb2j5yfA5YiYKtaYffk3ZAZAJxBY9q51m716CpnOZCvRj8JdZCCOnRZAdWSv7Il4rHB7Nf5gUntdvZAsK7AzmBpr4HqcbtlqPAnDcHZBrG4hAjVLeSpXYd9PRuw4K5r1j5oFJD583bx94hzQukNa332TTkhRZCbyZC6jwPZBLTMhHInonnJpkZCkTyAZArGEU8d5PaHZB59ZBT","expiration_date":"2015-09-14T04:04:00.787Z","id":"10202859189960918"}},"objectId":"xIF41iUgB0","createdAt":"2015-07-09T21:39:43.853Z","updatedAt":"2015-07-17T01:32:20.083Z"}';

var access_reg = /access_token":".*/;
var exp_reg = /expiration/;

var at_start = userString.search(access_reg);
var at_end = userString.search(exp_reg);

var access_token = userString.substring(at_start+15, at_end-3);

var id_reg = /\"id\"/;
var obj_reg = /objectId/;

var id_start = userString.search(id_reg);
var id_end = userString.search(obj_reg);

var id = userString.substring(id_start+6, id_end-5);

console.log(id);