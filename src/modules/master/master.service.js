import { NotFoundExceptions } from '../../common/helpers/exceptions';
import connection from '../../database';

const { db } = connection;

function findAll(tablename, search, limit, offset) {
  return db.task(async t => {
    const p1 = t.base.findAll(tablename, search, limit, offset);
    const p2 = t.base.findAllCount(tablename, search);

    const [datas, counts] = await Promise.all([p1, p2]);
    return { datas, counts };
  });
}

async function findById(tablename, id) {
  const result = await await db.base.findById(tablename, id);

  if (!result)
    throw new NotFoundExceptions(
      `The ${tablename
        .split('_')
        .slice(1)
        .join(' ')} with the given ID was not found.`
    );

  return result;
}

export const findAllAppointStatus = (search, limit, offset) => findAll('m_appoint_status', search, limit, offset);

export const findAppointStatusById = id => findById('m_appoint_status', id);

export const findAllAppointType = (search, limit, offset) => findAll('m_appoint_type', search, limit, offset);

export const findAppointTypeById = id => findById('m_appoint_type', id);

export const findAllBillingType = (search, limit, offset) => findAll('m_billing_type', search, limit, offset);

export const findBillingTypeById = id => findById('m_billing_type', id);

export const findAllItemGroup = (search, limit, offset) => findAll('m_item_group', search, limit, offset);

export const findItemGroupById = id => findById('m_item_group', id);

export const findAllItemLabGroup = (search, limit, offset) => findAll('m_item_lab_group', search, limit, offset);

export const findItemLabGroupById = id => findById('m_item_lab_group', id);

export const findAllMediaType = (search, limit, offset) => findAll('m_media_type', search, limit, offset);

export const findMediaTypeById = id => findById('m_media_type', id);

export const findAllOrderStatus = (search, limit, offset) => findAll('m_order_status', search, limit, offset);

export const findOrderStatusById = id => findById('m_order_status', id);

export const findAllPaymentType = (search, limit, offset) => findAll('m_payment_type', search, limit, offset);

export const findPaymentTypeById = id => findById('m_payment_type', id);

export const findAllPrefix = (search, limit, offset) => findAll('m_prefix', search, limit, offset);

export const findPrefixById = id => findById('m_prefix', id);

export const findAllPetGender = (search, limit, offset) => findAll('m_pet_gender', search, limit, offset);

export const findPetGenderById = id => findById('m_pet_gender', id);

export const findAllPetType = (search, limit, offset) => findAll('m_pet_type', search, limit, offset);

export const findPetTypeById = id => findById('m_pet_type', id);

export const findAllUserRole = (search, limit, offset) => findAll('m_user_role', search, limit, offset);

export const findUserRoleById = id => findById('m_user_role', id);

export const findAllVisitCause = (search, limit, offset) => findAll('m_visit_cause', search, limit, offset);

export const findVisitCauseById = id => findById('m_visit_cause', id);

export const findAllVisitPriority = (search, limit, offset) => findAll('m_visit_priority', search, limit, offset);

export const findVisitPriorityById = id => findById('m_visit_priority', id);

export const findAllVisitStatus = (search, limit, offset) => findAll('m_visit_status', search, limit, offset);

export const findVisitStatusById = id => findById('m_visit_status', id);

export const findAllVisitTreatment = (search, limit, offset) => findAll('m_visit_treatment', search, limit, offset);

export const findVisitTreatmentById = id => findById('m_visit_treatment', id);

export const findAllVisitType = (search, limit, offset) => findAll('m_visit_type', search, limit, offset);

export const findVisitTypeById = id => findById('m_visit_type', id);
