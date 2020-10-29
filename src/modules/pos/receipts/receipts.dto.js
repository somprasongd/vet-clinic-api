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
    creditCardIssuerId: Joi.any().when('paymentTypeId', {
      is: 3,
      then: Joi.number()
        .valid(1, 2, 3)
        .required(),
      otherwise: Joi.optional(),
    }),
    creditCardFeesMethodId: Joi.any().when('paymentTypeId', {
      is: 3,
      then: Joi.number()
        .valid(1, 2)
        .required(),
      otherwise: Joi.optional(),
    }),
    creditCardFees: Joi.number()
      .min(0)
      .default(0),
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
    creditCardIssuer,
    creditCardFeesMethod,
    creditCardFees,
    details,
    createAt,
    createBy,
    customer,
  };
};
