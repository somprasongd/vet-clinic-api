import Joi from 'joi';
import validationHandler from '../../../common/helpers/validation-handler';

export const createReceiptDTO = (req, res, next) => {
  const schema = Joi.object().keys({
    qty: Joi.number().min(1),
    salesPrice: Joi.number()
      .min(0)
      .required(),
    discount: Joi.number()
      .min(0)
      .default(0),
    netPrice: Joi.number().min(0),
    paymentTypeId: Joi.number()
      .valid(1, 2, 3)
      .required(),
    cash: Joi.any().when('paymentTypeId', {
      is: 1,
      then: Joi.number()
        .min(0)
        .required(),
      otherwise: Joi.forbidden(),
    }),
    change: Joi.any().when('paymentTypeId', {
      is: 1,
      then: Joi.number()
        .min(0)
        .required(),
      otherwise: Joi.forbidden(),
    }),
    creditCardIssuerId: Joi.any().when('paymentTypeId', {
      is: 3,
      then: Joi.number()
        .valid(1, 2, 3)
        .required(),
      otherwise: Joi.forbidden(),
    }),
    creditCardFeesMethodId: Joi.any().when('paymentTypeId', {
      is: 3,
      then: Joi.number()
        .valid(1, 2)
        .required(),
      otherwise: Joi.forbidden(),
    }),
    creditCardFees: Joi.any().when('paymentTypeId', {
      is: 3,
      then: Joi.number()
        .min(0)
        .required(),
      otherwise: Joi.forbidden(),
    }),
    note: Joi.string().allow(''),
  });

  const { dto } = validationHandler(req.body, schema);

  if (!dto.netPrice) {
    dto.netPrice = dto.salesPrice + dto.creditCardFees - dto.discount;
  }

  req.dto = { ...dto, posId: req.pos.id, createBy: req.user.id };
  next();
};

export const getReceiptDTO = (req, res, next) => {
  // const schema = Joi.object()
  //   .keys({
  //     receiptId: Joi.number().min(1),
  //     posId: Joi.number().min(1),
  //     receiptNumber: Joi.string(),
  //   })
  //   .xor('receiptId', 'posId', 'receiptNumber');

  // const { dto } = validationHandler(req.query, schema);

  req.dto = { posId: req.pos.id };
  next();
};

export const respondReceiptDTO = receipt => {
  const {
    clinicName,
    branchNo,
    branchName,
    phone,
    address,
    receiptNumber,
    qty,
    salesPrice,
    discount,
    netPrice,
    paymentType,
    cash,
    change,
    creditCardIssuer,
    creditCardFeesMethod,
    creditCardFees,
    details,
    createAt,
    createBy,
    customer,
  } = receipt;

  return {
    clinicName,
    branchNo,
    branchName,
    phone,
    address,
    receiptNumber,
    qty,
    salesPrice,
    discount,
    netPrice,
    paymentType,
    cash,
    change,
    creditCardIssuer,
    creditCardFeesMethod,
    creditCardFees,
    details,
    createAt,
    createBy,
    customer,
  };
};
