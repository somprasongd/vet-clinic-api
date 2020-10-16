import * as service from './results.service';
import { NotFoundExceptions } from '../../../common/helpers/exceptions';
import { respondVitalsignDTO } from './results.dto';

export const createVitalsign = async (req, res) => {
  const { dto } = req;

  const vitalsign = await service.createVitalsign(dto);

  res.json(respondVitalsignDTO(vitalsign));
};

export const listVitalsign = async (req, res) => {
  const { id } = req.visit;

  const vitalsigns = await service.findAllVitalsign({ visitId: id });

  res.json(vitalsigns);
};

export const getVitalsign = async (req, res) => {
  const { id } = req.params;
  const vitalsign = await service.findVitalsignById(id);

  if (!vitalsign) throw new NotFoundExceptions('The vitalsign with the given ID was not found.');

  res.json(respondVitalsignDTO(vitalsign));
};

export const cancelVitalsign = async (req, res) => {
  const { id } = req.params;
  const vitalsign = await service.deleteVitalsign(id);

  if (!vitalsign) throw new NotFoundExceptions('The vitalsign with the given ID was not found.');

  res.status(204).end();
};

export const updateVitalsign = async (req, res) => {
  const { dto } = req;

  const vitalsign = await service.updateVitalsign(req.params.id, dto);
  if (!vitalsign) throw new NotFoundExceptions('The vitalsign with the given ID was not found.');

  res.json(respondVitalsignDTO(vitalsign));
};
