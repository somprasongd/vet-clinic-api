import paginate from '../../common/helpers/res-with-paginate';
import * as service from './master.service';

export const findAllAppointStatus = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllAppointStatus(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findAppointStatusById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findAppointStatusById(id);

  res.json(result);
};

export const findAllAppointType = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllAppointType(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findAppointTypeById = async (req, res) => {
  const { id } = req.params;

  const result = await service.findAppointTypeById(id);

  res.json(result);
};

export const findAllItemGroup = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllItemGroup(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findItemGroupById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findItemGroupById(id);

  res.json(result);
};

export const findAllItemLabGroup = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllItemLabGroup(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findItemLabGroupById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findItemLabGroupById(id);

  res.json(result);
};

export const findAllMediaType = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllMediaType(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findMediaTypeById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findMediaTypeById(id);

  res.json(result);
};

export const findAllPaymentType = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllPaymentType(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findPaymentTypeById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findPaymentTypeById(id);

  res.json(result);
};

export const findAllCreditCardIssuer = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllCreditCardIssuer(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findCreditCardIssuerById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findCreditCardIssuerById(id);

  res.json(result);
};

export const findAllCreditCardFeesMethod = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllCreditCardFeesMethod(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findCreditCardFeesMethodById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findCreditCardFeesMethodById(id);

  res.json(result);
};

export const findAllPrefix = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllPrefix(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findPrefixById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findPrefixById(id);

  res.json(result);
};

export const findAllGender = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllPetGender(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findGenderById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findPetGenderById(id);

  res.json(result);
};

export const findAllType = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllPetType(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findTypeById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findPetTypeById(id);

  res.json(result);
};

export const findAllUserRole = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllUserRole(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findUserRoleById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findUserRoleById(id);

  res.json(result);
};

export const findAllVisitCause = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllVisitCause(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findVisitCauseById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findVisitCauseById(id);

  res.json(result);
};

export const findAllVisitPriority = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllVisitPriority(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findVisitPriorityById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findVisitPriorityById(id);

  res.json(result);
};

export const findAllVisitStatus = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllVisitStatus(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findVisitStatusById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findVisitStatusById(id);

  res.json(result);
};

export const findAllVisitType = async (req, res) => {
  const { limit, offset, page, search } = req.query;

  const { datas, counts } = await service.findAllVisitType(search, limit, offset);

  const results = paginate(datas, counts, limit, offset, page);
  res.json(results);
};

export const findVisitTypeById = async (req, res) => {
  const { id } = req.params;
  const result = await service.findVisitTypeById(id);

  res.json(result);
};
