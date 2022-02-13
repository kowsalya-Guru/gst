
var Invoice = require('../models/invoice');

exports.createInvoice = (req, res, next) => {
  req.body.active = true;
  Invoice.create(req.body, (err, r_invoice) => {
      if(err) {
          console.log(err);
          res.status(503).send(err);
      } else {
          res.send(r_invoice);
      }
  });
}

exports.readInvoice = (req, res, next) => {
    let _query = {};
    if(Object.keys(req.query).length) {
        _query = req.query;
        if(_query.active) _query.active = _query.active === 'true' ? true : false;
    }
    Invoice.find(_query, (err, r_invoice) => {
        if(err) {
            console.log(err);
            res.status(503).send(err);
        } else {
            console.log(r_invoice);
            res.send(r_invoice);
        }
    });
}

